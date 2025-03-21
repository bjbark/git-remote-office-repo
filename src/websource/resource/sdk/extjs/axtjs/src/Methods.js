Ext.define('Axt.Methods', {

	trim : function (input) {
		var str = input.replace(/(^\s*)|(\s*$)/, "");
	    return str;
	},
    isEmpty : function ( input ) {
    	if(input){
    		this.trim(input).length() < 1 ;
    	}else{
    		return true;
    	}
    }
}, function() {
    /**
     * @class Axt.MessageBox
     * @extends Ext.window.MessageBox
     * @singleton
     * Singleton instance of {@link Axt.window.MessageBox}.
     */
    Axt.Methods = new this();
});

