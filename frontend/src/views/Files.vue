<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { files as filesApi } from '../services/api';
import PaperIcon from '../assets/img/Paper.svg';
import FolderIcon from '../assets/img/Folder.svg';
import EditIcon from '../assets/img/Edit.svg';
import CloseIcon from '../assets/img/Close Square.svg';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const currentPath = ref('');
const files = ref<string[]>([]);
const folders = ref<string[]>([]);

const pathParts = computed(() => {
    if (!currentPath.value) return [];
    return currentPath.value.split('/').filter(Boolean);
});

const getPathUpToIndex = (index: number): string => {
    return pathParts.value.slice(0, index + 1).join('/');
};

const loadFiles = async (path?: string) => {
    loading.value = true;
    error.value = '';

    try {
        const response = await filesApi.list(path);
        files.value = response.files;
        folders.value = response.folders;
        currentPath.value = path || '';
    } catch (e: any) {
        if (e?.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/login');
        } else {
            error.value = 'Ошибка при загрузке файлов';
        }
    } finally {
        loading.value = false;
    }
};

const navigateToFolder = (folderPath: string) => {
    loadFiles(folderPath);
};

const navigateToPath = (path: string) => {
    loadFiles(path);
};

const getFolderName = (folderPath: string) => {
    const parts = folderPath.split('/');
    return parts[parts.length - 2] || folderPath;
};

const getFileName = (filePath: string) => {
    const parts = filePath.split('/');
    return parts[parts.length - 1] || filePath;
};

onMounted(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        router.push('/login');
        return;
    }
    loadFiles();
});

const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};
</script>

<template>
    <div class="container">
        <h1>Obsidian File Share</h1>
        <p>Просмотр и управление вашими Markdown файлами</p>
        <div class="files-container">
            <div class="breadcrumbs">
                <span class="breadcrumb-item">
                    <span class="breadcrumb-link" @click="navigateToPath('')">
                        Главная
                    </span>
                </span>
                <template v-if="currentPath">
                    <span class="breadcrumb-separator">/</span>
                    <template v-for="(part, index) in pathParts" :key="index">
                        <span class="breadcrumb-item">
                            <span 
                                class="breadcrumb-link" 
                                @click="navigateToPath(getPathUpToIndex(index))"
                            >
                                {{ part }}
                            </span>
                        </span>
                        <span 
                            v-if="index < pathParts.length - 1" 
                            class="breadcrumb-separator"
                        >/</span>
                    </template>
                </template>
            </div>

            <div class="files-header">
                <div class="name-column">Название</div>
                <div class="size-column">Размер</div>
                <div class="date-column">Дата изменения</div>
                <div class="actions-column">Действия</div>
            </div>

            <div v-if="loading" class="file-item">
                <div class="name-column">Загрузка...</div>
                <div class="size-column"></div>
                <div class="date-column"></div>
                <div class="actions-column"></div>
            </div>

            <div v-else-if="error" class="file-item">
                <div class="name-column" style="color: var(--red-color)">{{ error }}</div>
                <div class="size-column"></div>
                <div class="date-column"></div>
                <div class="actions-column"></div>
            </div>

            <div v-else class="files-list">
                <div v-for="folder in folders" :key="folder" class="file-item is-folder" @click="navigateToFolder(folder)">
                    <div class="name-column">
                        <img :src="FolderIcon" alt="folder" class="file-icon">
                        {{ getFolderName(folder) }}
                    </div>
                    <div class="size-column">-</div>
                    <div class="date-column">-</div>
                    <div class="actions-column" @click.stop>
                        <img :src="EditIcon" alt="edit" class="action-icon" title="Редактировать">
                        <img :src="CloseIcon" alt="delete" class="action-icon" title="Удалить">
                    </div>
                </div>

                <div v-for="file in files" :key="file" class="file-item">
                    <div class="name-column">
                        <img :src="PaperIcon" alt="file" class="file-icon">
                        {{ getFileName(file) }}
                    </div>
                    <div class="size-column">-</div>
                    <div class="date-column">-</div>
                    <div class="actions-column">
                        <img :src="EditIcon" alt="edit" class="action-icon" title="Редактировать">
                        <img :src="CloseIcon" alt="delete" class="action-icon" title="Удалить">
                    </div>
                </div>

                <div v-if="!files.length && !folders.length" class="file-item">
                    <div class="name-column">Папка пуста</div>
                    <div class="size-column"></div>
                    <div class="date-column"></div>
                    <div class="actions-column"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    color: var(--white-color);
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3vh;
}

p {
    text-align: center;
    color: var(--grey-color);
    font-size: 25px;
    margin-bottom: 5vh;
}

.container {
    text-align: center;
    padding: 0 20px;
}

.files-container {
    background-color: var(--bg-color-modal);
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.files-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 100px;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid var(--border-color);
    font-weight: bold;
    color: var(--white-color);
}

.files-list {
    color: var(--white-color);
}

.file-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 100px;
    padding: 12px 15px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
}

.file-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.name-column {
    display: flex;
    align-items: center;
    gap: 10px;
}

.file-icon {
    width: 24px;
    height: 24px;
}

.action-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 0 5px;
}

.action-icon:hover {
    opacity: 0.8;
}

.actions-column {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.size-column, .date-column {
    color: var(--grey-color);
}

.breadcrumbs {
    padding: 15px;
    border-bottom: 1px solid var(--border-color);
    color: var(--grey-color);
}

.breadcrumb-item {
    display: inline-block;
}

.breadcrumb-link {
    color: var(--white-color);
    cursor: pointer;
}

.breadcrumb-link:hover {
    text-decoration: underline;
}

.breadcrumb-separator {
    margin: 0 8px;
    color: var(--grey-color);
}

.is-folder {
    cursor: pointer;
}

.is-folder:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Предотвращаем наследование hover-эффекта на действия */
.actions-column {
    position: relative;
    z-index: 1;
}
</style>