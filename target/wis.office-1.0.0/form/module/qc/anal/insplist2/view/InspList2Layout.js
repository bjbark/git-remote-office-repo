Ext.define('module.qc.anal.insplist2.view.InspList2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-insplist2-layout',
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
			dockedItems : [ { xtype: 'module-insplist2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '불량 현황',
							layout	: 'border' ,
							border	: 0,
							itemId	: 'panel1',
							items	: [
								/*  상단  */
								{	xtype	: 'module-insplist2-lister',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '불량통계',
							layout	: 'border' ,
							itemId	: 'panel2',
							border	: 0,
							items	: [
								{	xtype	: 'module-insplist2-lister2',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-insplist2-lister2_1',
									flex	: 3,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-insplist2-lister3',
									flex	: 1,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-insplist2-lister3_1',
									flex	: 3,
									split	: true,
									region	: 'east',
									style	: Const.borderLine.bottom
								},{	xtype	: 'panel',
									layout	: 'border',
									flex	: 1,
									split	: true,
									region	: 'south',
									items : [
								{	xtype	: 'module-insplist2-lister4',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-insplist2-lister4_1',
									flex	: 7,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
									}]
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

