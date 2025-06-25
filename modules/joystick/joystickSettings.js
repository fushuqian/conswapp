export class JoystickSettings {
    static SETTINGS = Object.freeze([
        { type: "float", key: 'dzInner',              min: 0.0, max: 0.5,  def: 0.0, label: "死区 内部",                  tip: "Value of desired circular deadzone." },
        { type: "float", key: 'dzOuter',              min: 0.6, max: 1.0,  def: 1.0, label: "死区 外部",                  tip: "Value of the maximum range you want to limit stick output." },
        { type: "float", key: 'antiDzInnerC',         min: 0.0, max: 0.5,  def: 0.0, label: "反死区 圆形",   tip: "Value of the game's circular deadzone. Common sizes are 0.2 to 0.25." },
        { type: "float", key: 'antiDzInnerCYScale',   min: 0.0, max: 0.5,  def: 0.0, label: "反死区 圆形 Y轴", tip: "当死区是椭圆形时才修改此配置，修改数值后，反圆形死区将会接管高度和宽度控制" },
        { type: "float", key: 'antiDzSquare',         min: 0.0, max: 0.5,  def: 0.0, label: "反死区 方形",     tip: "Value of the game's square/axial deadzone. Common sizes are 0.2 to 0.25." },
        { type: "float", key: 'antiDzSquareYScale',   min: 0.0, max: 0.5,  def: 0.0, label: "反死区 方形 Y轴",   tip: "Only change if deadzone is rectangular.  When changed, antiSquareDeadzone will control the width and this the height." },
        { type: "float", key: 'antiDzAngular',        min: 0.0, max: 0.44, def: 0.0, label: "反死区 角度",    tip: "Use to counter reticted diagonal movement around the axes based on angle." }, 
        { type: "float", key: 'antiDzOuter',          min: 0.5, max: 1.0,  def: 1.0, label: "反死区 外部",      tip: "Once reached, stick outputs 100%. Useful if user's stick is unable to reach maximum magnitudes." },
        { type: "float", key: 'axialRestrict',        min: 0.0, max: 0.49, def: 0.0, label: "轴向限制",           tip: "Restrict diagonal movement based on distance from the axis." }, 
        { type: "float", key: 'angularRestrict',      min: 0.0, max: 0.44, def: 0.0, label: "角度限制",         tip: "Restrict diagonal movement around axis based on angle." }, 
        { type: "float", key: 'diagonalScaleMin',     min: 0.5, max: 1.42, def: 1.0, label: "对角线尺度 内部",     tip: "Use to warp lower magnitude diagonal values." }, 
        { type: "float", key: 'diagonalScaleMax',     min: 0.5, max: 1.42, def: 1.0, label: "对角线尺度 外部",     tip: "Use to warp higher magnitude diagonal values." }, 
        { type: "float", key: 'curve',                min: 0.3, max: 3.0,  def: 1.0, label: "曲线",                    tip: "Value of the game's curve to cancel it into a linear curve.  Larger values result in faster starting movement." }, 
        { type: "bool",  key: 'uncapRadius',          def: true,  label: "解锁半径", tip: "取消摇杆位置限制，使摇杆可以移出圆形范围" }, 
        { type: "bool",  key: 'invertY',              def: false, label: "翻转 Y",     tip: "翻转 Y 轴" }, 
        { type: "bool",  key: 'invertX',              def: false, label: "翻转 X",     tip: "翻转 X 轴" }, 
    ]);

    constructor() {
        this.resetAll();;
    }

    resetAll() {
        JoystickSettings.SETTINGS.forEach((setting) => {
            this[setting.key] = setting.def;
        });
    }

    getDefaultValue(key) {
        const intSetting = JoystickSettings.SETTINGS.find(s => s.key === key);
        if (intSetting !== undefined) {
            return intSetting.def;
        }
        console.warn(`按键无效: ${key}`);
        return null;
    }
};
