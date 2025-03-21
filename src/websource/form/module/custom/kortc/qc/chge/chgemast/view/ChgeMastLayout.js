Ext.define('module.custom.kortc.qc.chge.chgemast.view.ChgeMastLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-chgemast-layout',
	layout:'card',
	activeItem: 0,

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), ]; //me.createWordCard()
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-chgemast-search'} ],
			items :[
				{	xtype  : 'tab-panel',
					itemId : 'mainpanel',
					items  : [
						{	title	: '4M 변경관리',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-chgemast-lister',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '수입검사 리스트',
							layout	: 'border',
							hidden	: true,
							border	: 0,
							items	: [
		 						{	xtype	: 'module-chgemast-lister2',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				},{	xtype  : 'module-chgemast-editor', region : 'south'
				}
			]
		};
		return card;
	},

});