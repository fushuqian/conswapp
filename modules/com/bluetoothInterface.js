export class BTInterface {
    #device = null;
    #server = null;
    #service = null;
    #connected = false;

    async connect(uuid, options) {
        if (!navigator.bluetooth) {
            console.error("Web 蓝牙 API 不可用，请尝试使用其他浏览器。");
            return false;
        }

        try {
            this.#device = await navigator.bluetooth.requestDevice(options);
            this.#device.addEventListener('gattserverdisconnected', () => {
                this.disconnect();
            });

            this.#server = await this.#device.gatt.connect();
            this.#service = await this.#server.getPrimaryService(uuid);
            this.#connected = true;
        } catch (error) {
            console.error('蓝牙连接失败：', error);
            this.disconnect();
        }
        return this.#connected;
    }

    setDisconnectCb(cb) {
        if (this.#device) {
            this.#device.addEventListener('gattserverdisconnected', cb);
        }
    }

    async disconnect() {
        if (this.#device) {
            await this.#device.gatt.disconnect();
            this.#device = null;
        }
        this.#server = null;
        this.#service = null;
        this.#connected = false;
    }

    isConnected() {
        return this.#connected && this.#device?.gatt?.connected && this.#server && this.#service;
    }
    
    async write(uuid, data) {
        if (!this.isConnected()) {
            console.error('蓝牙设备未连接。');
            return;
        }
        try {
            const characteristic = await this.#service.getCharacteristic(uuid);
            await characteristic.writeValue(data);
            return true;
        } catch (error) {
            console.error('写入蓝牙设备失败：', error);
        }
        return false;
    }

    async read(uuid) {
        if (!this.isConnected()) {
            console.error('蓝牙设备未连接。');
            return null;
        }
        try {
            const characteristic = await this.#service.getCharacteristic(uuid);
            const value = await characteristic.readValue();
            if (value) {
                return new Uint8Array(value.buffer);
            }
        } catch (error) {
            console.error('从蓝牙设备读取失败：', error);
        }
        return null;
    }
}
