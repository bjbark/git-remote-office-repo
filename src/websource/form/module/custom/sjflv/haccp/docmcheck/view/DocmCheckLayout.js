Ext.define('module.custom.sjflv.haccp.docmcheck.view.DocmCheckLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-docmcheck-layout',
	layout:'card',
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);

	},
	createListCard:function(){
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [{xtype: 'module-sjflv-docmcheck-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					listeners: {
						beforetabchange: function (tabPanel, newCard, oldCard) {
							if (tabPanel.allowTabChange) {
								tabPanel.allowTabChange = false;
								return true;
							}
							return false;  // 사용자 클릭으로는 변경 불가
						}
					},
					items	: [
						{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							title	: '점검일지 목록',
							name	: 'firstTab',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-docmcheck-lister1',
									region	: 'center',
									flex	: 1,
								},{	xtype	: 'module-sjflv-docmcheck-lister2',
									region	: 'east',
									split	: true,
									flex	: 1,
								}
							]
						},{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							title	: '점검일지 등록',
							name	: 'secondTab',
							items	: [
								{	xtype	: 'module-sjflv-docmcheck-editor',
									region	: 'north',
								},{	xtype	: 'module-sjflv-docmcheck-panel',
									region	: 'center',
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
