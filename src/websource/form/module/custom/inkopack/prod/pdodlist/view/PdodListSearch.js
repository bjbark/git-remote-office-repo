Ext.define('module.custom.inkopack.prod.pdodlist.view.PdodListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-pdodlist-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0 ,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 60,
				autoScroll: true,
				items	: [
					{	height: 60,
						xtype	: 'panel',
						border	: 0,
						region	: 'center',
						width	: '100%',
						style	: 'text-align:center;',
						items	: [
							{	xtype	: 'label',
								text	: '작 업 현 황',
								style	: 'font-size:4em !important;'		//밑줄 원한다면 text-decoration: underline;text-underline-position: under;
							},{	buttonAlign	: 'right',
								xtype		: 'button',
								text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
								cls			: 'btn btn-danger button-right',
								margin		: '8 10 0 0',
								width		: 200,
								style: 'text-decoration:none;position: absolute;',
								handler:function(){
									var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
									sideButton.click();
									clearInterval(window.settime);
									me.up('panel').close();
								}
							}
						]
					}
				]
			}
		;
		return line;
	},
	reload : function(){
		var me = this
			listermaster	= Ext.ComponentQuery.query('module-pdodlist-lister-master')[0] ,
			listerdetail	= Ext.ComponentQuery.query('module-pdodlist-lister-detail')[0]
		;
	}

});