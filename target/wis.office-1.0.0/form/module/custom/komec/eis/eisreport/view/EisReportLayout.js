Ext.define('module.custom.komec.eis.eisreport.view.EisReportLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-komec-eisreport-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		},
		close:function(){
			clearInterval(window.mainTabInterval);
		}
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-komec-eisreport-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title		: '작업내역',
							layout		: 'fit',
							border		: 0,
							items		: [
								{	xtype	: 'module-komec-eisreport-lister',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: '설비현황',
							layout		: 'border',
							border		: 0,
							hidden		: true,
							items		: [
								{	xtype	: 'module-komec-eisreport-lister2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: '온도,RPM',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-komec-eisreport-lister3',
									width	: 390,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-komec-eisreport-lister4',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						}
					]
				}
			]
		}
	return card;
	}
});


