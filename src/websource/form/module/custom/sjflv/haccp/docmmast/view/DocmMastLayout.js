Ext.define('module.custom.sjflv.haccp.docmmast.view.DocmMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-docmmast-layout',
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
			dockedItems : [{xtype: 'module-sjflv-docmmast-search'} ],
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
							title	: 'HACCP양식 목록',
							name	: 'firstTab',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-docmmast-lister1',
									region	: 'center',
									flex	: 1,
								},{	xtype	: 'module-sjflv-docmmast-lister2',
									region	: 'east',
									split	: true,
									flex	: 1,
								}
							]
						},{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							title	: 'HACCP양식 등록',
							name	: 'secondTab',
							items	: [
								{	xtype	: 'module-sjflv-docmmast-editor',
									region	: 'north',
								},{	xtype	: 'module-sjflv-docmmast-lister3',
									region	: 'center',
									dockedItems : [{xtype: 'module-sjflv-docmmast-search2'}],
									flex	: 1,
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
