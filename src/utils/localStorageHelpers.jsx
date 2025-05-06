export const getNotesByRecipeId = (recipeId) => {
    try {
        const notesJson = localStorage.getItem(`recipeNotes_${recipeId}`);
        // 如果存在，解析 JSON；否则返回空数组
        return notesJson ? JSON.parse(notesJson) : [];
    } catch (e) {
        console.error(`Error getting notes for recipe ${recipeId} from localStorage`, e);
        return []; // 出错时返回空数组
    }
};

// 根据食谱 ID 保存笔记列表
export const saveNotesByRecipeId = (recipeId, notes) => {
    try {
        localStorage.setItem(`recipeNotes_${recipeId}`, JSON.stringify(notes));
    } catch (e) {
        console.error(`Error saving notes for recipe ${recipeId} to localStorage`, e);
        // 可以在这里给用户一个提示
    }
};

// 添加新的笔记
export const addNoteToRecipe = (recipeId, noteText) => {
    const notes = getNotesByRecipeId(recipeId);
    const newNote = {
        // 生成一个简单的唯一 ID
        id: Date.now() + Math.random(), // 使用时间戳+随机数作为 ID
        text: noteText,
        timestamp: new Date().toISOString(), // 记录时间 (ISO 格式字符串)
    };
    const updatedNotes = [...notes, newNote];
    saveNotesByRecipeId(recipeId, updatedNotes);
    return updatedNotes; // 返回更新后的笔记列表
};

// 更新现有笔记
export const updateNoteForRecipe = (recipeId, noteId, newNoteText) => {
    const notes = getNotesByRecipeId(recipeId);
    const updatedNotes = notes.map(note =>
        note.id === noteId ? { ...note, text: newNoteText } : note
    );
    saveNotesByRecipeId(recipeId, updatedNotes);
    return updatedNotes; // 返回更新后的笔记列表
};

// 删除笔记
export const deleteNoteForRecipe = (recipeId, noteId) => {
    const notes = getNotesByRecipeId(recipeId);
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotesByRecipeId(recipeId, updatedNotes);
    return updatedNotes; // 返回更新后的笔记列表
};

export const getAllRecipeNotes = () => {
    const allNotes = [];
    // 遍历 localStorage 中的所有 key
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // 检查 key 是否以存储食谱笔记的固定前缀开始
        if (key.startsWith('recipeNotes_')) {
            // 从 key 中提取食谱 ID
            const recipeId = key.replace('recipeNotes_', '');
            try {
                // 获取并解析该食谱的笔记数据
                const notesJson = localStorage.getItem(key);
                if (notesJson) {
                    const notesForRecipe = JSON.parse(notesJson);
                    // 如果该食谱有笔记，遍历这些笔记
                    notesForRecipe.forEach(note => {
                        // 将笔记对象复制一份，并添加一个 recipeId 属性，以便知道这条笔记属于哪个食谱
                        allNotes.push({ ...note, recipeId: recipeId });
                    });
                }
            } catch (e) {
                // 如果解析出错，记录错误但不中断
                console.error(`Error parsing notes from key ${key}`, e);
            }
        }
    }
    // 可选：对所有笔记进行排序，例如按时间倒序排列 (最新的笔记在前)
    allNotes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // 按时间戳从新到旧排序

    return allNotes; // 返回包含所有笔记的数组
};