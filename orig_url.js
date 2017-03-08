var orig_url = function() {
    var _url = '';

    this.setUrl = function(str) {
        _url=str;
    }

    this.getUrl = function() {
        return _url;
    }
}

orig_url.instance = null;

orig_url.getInstance = function() {
    if (this.instance === null) {
        this.instance = new orig_url();
    }

    return this.instance;
}

module.exports = orig_url.getInstance();