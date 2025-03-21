Ext.define('module.custom.iypkg.eis.cvicmonitring.view.CvicMonitringLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-cvicmonitring-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'fit',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-cvicmonitring-search'} ],
			items : [
				{	layout	: 'border',
					flex	: 1,
					border	: 0,
					region	: 'center',
					items	: [
						{
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-cvicmonitring-lister-master',
									itemId	: 'panel',
									flex	: 1,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.right //Const.borderLine.left +
								}
							]
						}
					],
//					listeners:{
//						render:function(){
//							var listermaster	= Ext.ComponentQuery.query('module-cvicmonitring-lister-master')[0]
//							;
//							var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
//							mask.show();
//							listermaster.select({
//								callback:function(records, operation, success) {
//									if (success) {
//									} else {
//									}
//								}, scope:me
//							}, Ext.merge({stor_id : _global.stor_id}) );
//							mask.hide();
//							window.settime = setInterval(function(){
//								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
//								mask.show();
//								mask.hide();
//							}, 30000);
//						}
//					}
				}
			]
		}
	return card;
	},
});