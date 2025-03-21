Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-ordermast2-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-ordermast2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	layout	: 'border' ,
							title	: 'Order 목록',
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-ordermast2-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									items : [
										/*  하단  */
										{	title	: '선적 서류',
											xtype	: 'module-ordermast2-lister-detail',
											flex	: 1 ,
											region	: 'center',
											style	: Const.borderLine.top
										},{	title	: '입고 서류',
											xtype	: 'module-ordermast2-lister-detail2',
											flex	: 1 ,
											region	: 'center',
											hidden :_global.hq_id.toUpperCase()=='N1000SJUNG' ? true : false,
											style	: Const.borderLine.top
										},{	title	: '송금증',
											xtype	: 'module-ordermast2-lister-detail3',
											flex	: 1 ,
											hidden :_global.hq_id.toUpperCase()=='N1000SJUNG' ? true : false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
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
				{	xtype:'module-ordermast2-worker-editor', region:'north'
				},{	xtype:'module-ordermast2-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

