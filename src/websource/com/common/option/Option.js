Ext.define('com.common.option.Option', {
	alternateClassName: [ '_option' ],
	
    singleton : true,
    
    /* 주문매출검수 */
    _salecheckstore : undefined,
    _salecheckmodel : undefined,
    salecheckoption : function ( config ) {
    	var me = this
    	;
    	if (me._salecheckmodel) {
    		return me._salecheckmodel ;
    	} else {
       		if (!me._salecheckstore) {
       			me._salecheckstore = Ext.create('com.common.option.store.SaleCheckOption' ,  { 
       				async : false
       			})
       		}
       		me._salecheckstore.load({
       			callback : function(records, operation, success) {
       				if (success) {
       					if(records.length < 1) {
       						me._salecheckmodel = Ext.create( me._salecheckstore.model.modelName );
       						me._salecheckstore.add( me._salecheckmodel );
       					} else {
       						me._salecheckmodel = records[0]; 
       					}
       				}
       			}
       		});
       		return me._salecheckmodel;
    	}
    },
    
    /* 종합청구서 발행 */
	_totalreqworkstore : undefined,
	_totalreqworkmodel : undefined,
	totalreqworkoption : function ( config ) {
		var me = this
		;
		if (me._totalreqworkmodel) {
			return me._totalreqworkmodel ;
		} else {
	   		if (!me._totalreqworkstore) {
	   			me._totalreqworkstore = Ext.create('com.common.option.store.TotalReqWorkOption' ,  { 
	   				async : false
	   			})
	   		}
	   		me._totalreqworkstore.load({
	   			callback : function(records, operation, success) {
	   				if (success) {
	   					if(records.length < 1) {
	   						me._totalreqworkmodel = Ext.create( me._totalreqworkstore.model.modelName );
	   						me._totalreqworkstore.add( me._totalreqworkmodel );
	   					} else {
	   						me._totalreqworkmodel = records[0]; 
	   					}
	   				}
	   			}
	   		});
	   		return me._totalreqworkmodel;
		}
	}
});
