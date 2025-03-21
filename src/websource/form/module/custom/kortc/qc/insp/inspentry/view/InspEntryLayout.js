Ext.define('module.custom.kortc.qc.insp.inspentry.view.InspEntryLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-inspentry-layout',
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
			dockedItems : [ {xtype: 'module-inspentry-search'} ],
			items :[
				{	xtype  : 'tab-panel',
					itemId : 'mainpanel',
					items  : [
						{	title	: '수입검사입력',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-inspentry-lister',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '수입검사 리스트',
							layout	: 'border',
							border	: 0,
							items	: [
		 						{	xtype	: 'module-inspentry-lister2',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				},{	xtype  : 'module-inspentry-editor', region : 'south'
				}
			]
		};
		return card;
	},

});