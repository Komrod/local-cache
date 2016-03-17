

function Cache() {
	this.dir = './cache/';
	this.prefix = '';
	this.suffix = '';
	this.extension = '.cache';
	this.ttl = 3600;
}


Cache.prototype.fileExists = function(file) {
	try {
	    return  require('fs').lstatSync(file);
	} catch (e) {
	    return false;
	}
};


Cache.prototype.exists = function(name) {
	return this.fileExists(this.getFilePath(name));
};


Cache.prototype.getFilePath = function(name) {
	return require('path').resolve(this.dir+this.prefix+name.replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/\-[-]+/gi, '-')+this.suffix+this.extension);
};


Cache.prototype.write = function(name, object) {
	try {
		var json = JSON.stringify(object);
		var file = this.getFilePath(name);
		require('fs').writeFileSync(file, json);
	} catch (e) {
		console.log(e);
		return false;
	}
	return true;
};


Cache.prototype.delete = function(name) {
	try {
		require('fs').unlinkSync(this.getFilePath(name));
	} catch (e) {
		return false;
	}
	return true;
};


Cache.prototype.read = function(name, ttl) {
	
	if (ttl !== false && !this.valid(name, ttl)) {
		return false;
	}

	try {
		return JSON.parse(require('fs').readFileSync(this.getFilePath(name)));
	} catch (e) {
		return false;
	}
};


Cache.prototype.valid = function(name, ttl, stats) {
	ttl = ttl || this.ttl;
	try {
		if (!stats) { 
			stats = this.exists(name);
		}
		if (!stats) { 
			return false;
		}
		var now = new Date().getTime();
		var atime = stats.atime.getTime();
		return (atime + ttl * 1000 > now);
	} catch (e) {
		return false;
	}
};


module.exports = Cache;

