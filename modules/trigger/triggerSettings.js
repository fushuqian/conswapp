export class TriggerSettings {
    static SETTINGS = Object.freeze([
        { type: "float", key: "dzInner",     min: 0.0, max: 0.5, def: 0.0, label: "死区 内部", tip: "" },
        { type: "float", key: "dzOuter",     min: 0.5, max: 1.0, def: 1.0, label: "死区 外部", tip: "" },
        { type: "float", key: "antiDzInner", min: 0.0, max: 0.5, def: 0.0, label: "反死区 内部", tip: "" },
        { type: "float", key: "antiDzOuter", min: 0.5, max: 1.0, def: 1.0, label: "反死区 外部", tip: "" },
        { type: "float", key: 'curve',       min: 0.3, max: 3.0, def: 1.0, label: "曲线", tip: "" },
    ]);

    constructor() {
        this.resetAll();
    }

    resetAll() {
        TriggerSettings.SETTINGS.forEach(setting => {
            this[setting.key] = setting.def;
        });
    }

    getDefaultValue(key) {
        const setting = TriggerSettings.SETTINGS.find(setting => setting.key === key);
        if (setting !== undefined) {
            return setting.def;
        }
        console.warn(`未找到设置: ${key}`);
        return null;
    }
}
