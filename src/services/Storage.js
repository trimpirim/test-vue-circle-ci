import * as properties from "../properties";

class Storage {
	constructor() {
		
	}

	get(key, defaultValue) {
        var value = localStorage.getItem(key,defaultValue);
		if(value) {
			return JSON.parse(value);
		}
		return null;
	}

	set(key, value) {
		localStorage.setItem(key,value);
	}

	remove(key) {
		localStorage.removeItem(key);
	}

    setToken(value) {
        this.set(properties.storage_token,value);
    }

    getToken() {
        this.get(properties.storage_token,null);
    }
	
}

const storage = new Storage();

export default storage;