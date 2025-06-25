<script setup lang="ts">
import { ref, computed } from 'vue';
import PaperIcon from '../assets/img/Paper.svg';
import FolderIcon from '../assets/img/Folder.svg';
import EditIcon from '../assets/img/Edit.svg';
import CloseIcon from '../assets/img/Close Square.svg';

interface File {
    id: string;
    name: string;
    type: 'file' | 'folder';
    size?: number;
    lastModified: Date;
    path: string;
    children?: File[];
}

// Здесь будут данные с бэкенда
const mockFiles: File[] = [
    {
        id: '1',
        name: 'Документы',
        type: 'folder',
        lastModified: new Date(),
        path: '/documents',
        children: [
            {
                id: '1-1',
                name: 'рабочие',
                type: 'folder',
                lastModified: new Date(),
                path: '/documents/рабочие',
                children: [
                    {
                        id: '1-1-1',
                        name: 'отчет.md',
                        type: 'file',
                        size: 2048,
                        lastModified: new Date(),
                        path: '/documents/рабочие/отчет.md'
                    }
                ]
            },
            {
                id: '1-2',
                name: 'заметки.md',
                type: 'file',
                size: 1024,
                lastModified: new Date(),
                path: '/documents/заметки.md'
            }
        ]
    },
    {
        id: '2',
        name: 'важные_заметки.md',
        type: 'file',
        size: 1024,
        lastModified: new Date(),
        path: '/важные_заметки.md'
    },
    {
        id: '3',
        name: 'проекты',
        type: 'folder',
        lastModified: new Date(),
        path: '/projects',
        children: [
            {
                id: '3-1',
                name: 'веб-сайт',
                type: 'folder',
                lastModified: new Date(),
                path: '/projects/веб-сайт',
                children: [
                    {
                        id: '3-1-1',
                        name: 'идеи.md',
                        type: 'file',
                        size: 3072,
                        lastModified: new Date(),
                        path: '/projects/веб-сайт/идеи.md'
                    }
                ]
            }
        ]
    }
];

const currentPath = ref<string[]>([]);
const files = ref<File[]>(mockFiles);

// Вычисляем текущие отображаемые файлы на основе пути
const currentFiles = computed(() => {
    let result = mockFiles;
    for (const pathSegment of currentPath.value) {
        const folder = result.find(f => f.name === pathSegment);
        if (folder?.children) {
            result = folder.children;
        }
    }
    return result;
});

// Вычисляем путь навигации
const breadcrumbs = computed(() => {
    return [{ name: 'Главная', path: [] }, ...currentPath.value.map((name, index) => ({
        name,
        path: currentPath.value.slice(0, index + 1)
    }))];
});

const navigateToFolder = (folder: File) => {
    if (folder.type === 'folder') {
        currentPath.value.push(folder.name);
    }
};

const navigateToBreadcrumb = (path: string[]) => {
    currentPath.value = [...path];
};

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
            <!-- Навигационная цепочка -->
            <div class="breadcrumbs">
                <span 
                    v-for="(crumb, index) in breadcrumbs" 
                    :key="index"
                    class="breadcrumb-item"
                >
                    <span 
                        class="breadcrumb-link"
                        @click="navigateToBreadcrumb(crumb.path)"
                    >
                        {{ crumb.name }}
                    </span>
                    <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
                </span>
            </div>

            <div class="files-header">
                <div class="name-column">Название</div>
                <div class="size-column">Размер</div>
                <div class="date-column">Дата изменения</div>
                <div class="actions-column">Действия</div>
            </div>
            <div class="files-list">
                <div 
                    v-for="file in currentFiles" 
                    :key="file.id" 
                    class="file-item"
                    :class="{ 'is-folder': file.type === 'folder' }"
                    @click="file.type === 'folder' && navigateToFolder(file)"
                >
                    <div class="name-column">
                        <img :src="file.type === 'folder' ? FolderIcon : PaperIcon" alt="icon" class="file-icon">
                        {{ file.name }}
                    </div>
                    <div class="size-column">
                        {{ file.type === 'file' && file.size ? formatFileSize(file.size) : '-' }}
                    </div>
                    <div class="date-column">
                        {{ formatDate(file.lastModified) }}
                    </div>
                    <div class="actions-column" @click.stop>
                        <img :src="EditIcon" alt="edit" class="action-icon" title="Редактировать">
                        <img :src="CloseIcon" alt="delete" class="action-icon" title="Удалить">
                    </div>
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