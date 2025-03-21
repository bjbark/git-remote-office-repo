Ext.define('module.basic.hldymast.view.HldyMastLayout', { extend: 'Axt.form.Layout',
	alias   : 'widget.module-hldymast-layout',
	/**
	 *
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-hldymast-search'});
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items: [
				 	{ title : Language.get('stor_info' , '사업장별 휴일 리스트'),  xtype : 'module-hldymast-lister'}
				]
			},{	title : '휴일 정보',  xtype : 'module-hldymast-editor', region : 'south',  hidden : false }
		];
		me.callParent(arguments);
	}
});


