Ext.define('Axt.panel.plugin.HeaderIcons', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.headericons',
//	alternateClassName: 'Ext.ux.PanelHeaderExtraIcons',
 
	iconCls: '',
	index: undefined,
 
	items: [],

	init: function(panel) {
		this.panel = panel;
		this.callParent();
		panel.on('render', this.onAddIcons, this, {single: true});
		//this.header.padding = '2px 2px 2px 6px' ;
	},

	onAddIcons :function () {
		if (this.panel.getHeader) {
			this.header = this.panel.getHeader();
		} else if (this.panel.getOwnerHeaderCt) {
			this.header = this.panel.getOwnerHeaderCt();
		}
		//this.header
//		var padding = this.header.layout.padding;
//		
//		//padding : '2px 2px 2px 2px'   // 상 우 하 좌   5 6 4 6    
//		padding.top = 2 ;
//		padding.bottom = 2 ;
//		padding.left = 2 ;
//		padding.right= 2 ;
//
//		console.debug( 'this.header', this.header );
		//{'2px 2px 2px 6px' ;
		this.header.insert(this.index || this.header.items.length, this.items);
	}
});