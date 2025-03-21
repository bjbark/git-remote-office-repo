Ext.define('module.qc.insp.inspreport.view.InspReportLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-inspreport-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-inspreport-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수입 검사',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspreport-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title		: '공정검사',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-inspreport-lister1',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
								}
							]
						},{	title		: '최종검사',
							layout		: 'border',
							border		: 0,
							hidden		: _global.hq_id.toUpperCase() == 'N1000KOMEC' ? true : false,
							items		: [
								{	xtype	: 'module-inspreport-lister3',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
								}
							]
						},{	title		: '출하검사',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-inspreport-lister2',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
								}
							]
						}
					]
				}
			]
		};
		return card;
	},
});

