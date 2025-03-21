Ext.define('module.custom.inkopack.prod.pdodlist.view.PdodListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-pdodlist-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-pdodlist-search'}),
		me.items = [
			{	layout	: 'border',
				flex	: 1,
				border	: 0,
				region	: 'center',
				items	: [
					{	region	: 'center',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-pdodlist-lister-master', /*  상단  */
								flex	: 1,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.bottom
							},{	xtype	: 'module-pdodlist-lister-detail',
								split	: true,
								region	: 'center',
								flex	: 1,
								style	: Const.borderLine.bottom
							}
						],
						listeners:{
							render:function(){
								var listermaster	= Ext.ComponentQuery.query('module-pdodlist-lister-master')[0] ,
									listerdetail	= Ext.ComponentQuery.query('module-pdodlist-lister-detail')[0]
								;
								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
								mask.show();
								listermaster.select({
									callback:function(records, operation, success) {
										if (success) {
										} else {
										}
									}, scope:me
								}, Ext.merge({stor_id : _global.stor_id}) );
								listerdetail.select({
									callback:function(records, operation, success) {
										if (success) {
										} else {
										}
									}, scope:me
								}, Ext.merge({stor_id : _global.stor_id}) );
								mask.hide();
								window.settime = setInterval(function(){
									var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
									mask.show();
									listermaster.getStore().reload();
									listerdetail.getStore().reload();
									mask.hide();
								}, 30000);
							},
							destroy : function(){
								clearInterval(window.settime);
							}
						}
					}
				],
			}
		];
		me.callParent(arguments);
	}
});