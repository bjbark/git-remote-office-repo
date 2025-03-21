Ext.define('module.notice.noticeview.view.NoticeViewLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-noticeview-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-noticeview-search'} ],
			items		: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '공지사항목록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-noticeview-lister-master', /*  상단  */
											region	: 'center',
										}
									]
								},{	xtype : 'module-noticeview-editor', region : 'south', hidden : true}
							]
						}
					]
				}
			]
		}
		return card;
	}
});