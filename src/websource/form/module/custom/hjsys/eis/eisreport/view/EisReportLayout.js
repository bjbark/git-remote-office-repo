Ext.define('module.custom.hjsys.eis.eisreport.view.EisReportLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-hjsys-eisreport-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-hjsys-eisreport-editor'});
		me.items = [ me.createListCard(),me.createWordCard1(),me.createWordCard2(),me.createWordCard3(),me.createWordCard4(),me.createWordCard5()];
		me.callParent(arguments);
	},

	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		},
	},
	createListCard : function () {
		var card = {
			layout		: 'fit',
			border		: 0 ,
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
								{	xtype	: 'module-hjsys-eisreport-lister-detail1',
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
	createWordCard1 : function () {
		var	card = {
				layout	: 'border',
				border	: 0 ,
				items	: [
				     	   {	xtype:'module-hjsys-eisreport-lister-detail1',
				     		   style	: Const.borderLine.bottom,
				     		   region	: 'center',
				     		   flex	: 1
				     	   }
				     	   ]
		};
		return card;
	},
	createWordCard2 : function () {
		var	card = {
				layout	: 'border',
				border	: 0 ,
				items	: [
				     	   {	xtype:'module-hjsys-eisreport-lister-detail2',
				     		   style	: Const.borderLine.bottom,
				     		   region	: 'center',
				     		   flex	: 1
				     	   }
				     	   ]
		};
		return card;
	},
	createWordCard3 : function () {
		var	card = {
				layout	: 'border',
				border	: 0 ,
				items	: [
				     	   {	xtype:'module-hjsys-eisreport-lister-detail3',
				     		   style	: Const.borderLine.bottom,
				     		   region	: 'center',
				     		   flex	: 1
				     	   }
				     	   ]
		};
		return card;
	},
	createWordCard4 : function () {
		var	card = {
				layout	: 'border',
				border	: 0 ,
				items	: [
				     	   {	xtype:'module-hjsys-eisreport-lister-detail4',
				     		   style	: Const.borderLine.bottom,
				     		   region	: 'center',
				     		   flex	: 1
				     	   }
				     	   ]
		};
		return card;
	},
	createWordCard5 : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-hjsys-eisreport-lister-detail5',
					style	: Const.borderLine.bottom,
					region	: 'center',
					flex	: 1
				}
			]
		};
	return card;
	},
});