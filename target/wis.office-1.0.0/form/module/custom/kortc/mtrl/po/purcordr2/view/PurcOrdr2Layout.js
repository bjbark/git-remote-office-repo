Ext.define('module.custom.kortc.mtrl.po.purcordr2.view.PurcOrdr2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcordr2-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-purcordr2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-purcordr2-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-purcordr2-lister-detail',
									flex	: 1 ,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
					 	}
						,{	title	: '발주 등록',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-purcordr2-worker-editor2',
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-purcordr2-worker-search2',
									region	: 'north',
									style	: Const.borderLine.bottom
								},{
									xtype	: 'module-purcordr2-worker-lister2',
									flex	: 2.9,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{
									xtype	: 'module-purcordr2-worker-lister3',
									flex	: 10,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
					 	}
					]
				}
			]
		};
		return card;
	},

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-purcordr2-worker-editor', region:'north'
				},{	xtype:'module-purcordr2-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	},
});

