Ext.define('module.custom.hjsys.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-workentry-search',
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic()
		];
		me.callParent();

		window._stdt = new Ext.util.HashMap();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 70,
				margin	: '0 40 0 40',
				items	: [
					{	name		: 'invc_numb'	,
						fieldCls	: 'textTemp field-c-25',
						xtype		: 'searchfield'	,
						flex		: 1,
						value		: null,
						margin		: '6 50 0 100'		,
						height		: 60,
						emptyText	: '바코드를 스캔하세요.',
						style		: 'text-align:center',
						enableKeyEvents : true			,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == 9) {
									var value = self.getValue().replace(/\//gi,'-');
									var searchButton = self.up('form').down('[action=selectAction]');
									searchButton.fireEvent('click', searchButton); //조회버튼클릭

									var n = 0;

									if(window._stdt.length > 0){
										window._stdt.each(function(key, val, length){
											if(value == key){		//포함여부
												n = 1;
											}
										});
										if(n == 0){
											window._stdt.add(value, new Date());
										}
									}else if(window._stdt.length == 0){
										window._stdt.add(value, new Date());
									}

									self.setValue('');

								}
							}
						}
					},{	xtype	: 'textfield', name: 'search_val', hidden : true
					},{	xtype	: 'button'  ,action : Const.SELECT.action, hidden : true
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 165,
						height		: 46,
						margin		: '12 0 0 0',
						style		: 'text-decoration:none;',
						handler:function(){
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').close();
						}
					}
				]
			};
		return line;
	},

});