Ext.define('module.close.monthlyclose.view.MonthlyCloseSearch', { extend: 'Axt.form.Search',
	
	alias: 'widget.module-monthlyclose-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
		    me.createLine1()
		];
		me.callParent();
	},
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this, line = 
		{
			xtype : 'fieldset',
			layout: 'hbox',
			items : 
			[
			 	{	
			 		fieldLabel : '업무명',
			 		xtype      : 'searchfield',  
			 		name       : 'stor_nm'
	  		 	}
			]
		};
		return line;
	}
});
