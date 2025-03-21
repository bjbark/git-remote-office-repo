Ext.define('module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcordr-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard(), me.createWordCard2() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-purcordr-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-purcordr-lister-master',
									flex	:  2 ,
									split	: true,
//									region	: _global.hq_id.toUpperCase()!='N1000SJFLV' ? 'center' : 'north',
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
//									hidden	: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
									items : [
										/*  하단  */
										{	title	: '발주 내역',
											xtype	: 'module-purcordr-lister-detail',
											flex	: 1 ,
											region	: 'center',
											style	: Const.borderLine.top
										},{	title	: '입고 서류',
											xtype	: 'module-purcordr-lister-detail2',
											flex	: 1 ,
											region	: 'center',
											hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
											style	: Const.borderLine.top
										},{	title	: '선적 서류',
											xtype	: 'module-purcordr-lister-detail4',
											flex	: 1 ,
											region	: 'center',
											hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
											style	: Const.borderLine.top
										},{	title	: '송금증',
											xtype	: 'module-purcordr-lister-detail3',
											flex	: 1 ,
											region	: 'center',
											hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
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
				{	xtype:'module-purcordr-worker-editor', region:'north'
				},{	xtype:'module-purcordr-worker-lister', region:'center' , style : Const.borderLine.top
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
				{	xtype:'module-purcordr-worker-editor2', region:'north'
				},{	xtype:'module-purcordr-worker-lister2', region:'center' , style : Const.borderLine.top
				}
			]
		};
		return card;
	}
});

