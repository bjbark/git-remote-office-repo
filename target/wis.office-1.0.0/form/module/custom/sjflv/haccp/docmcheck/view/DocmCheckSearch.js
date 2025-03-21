Ext.define('module.custom.sjflv.haccp.docmcheck.view.DocmCheckSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-docmcheck-search',
	
	 initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(), me.addonSearch()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
						,height	: 34
						,margin : '3 0 0 0'
						,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
						,layout	: 'hbox'
						,items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'     ,
								xtype	: 'searchfield',
								flex	: 4,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	},
	
	addonSearch : function(){
		var me = this,
		line = {
			xtype			: 'fieldset',
			title			: '상세검색',
			collapsible		: true,
			collapsed		: false,
			name			: 'collapsed',
			layout			: 'vbox',
			defaults		: { layout: 'hbox', margin : '0 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset',
					items : [
						{	xtype		: 'popupfield',
							fieldLabel	: Language.get('istt_dvcd', '양식분류'),
							name		: 'clss_desc',
							editable	: true,
							enableKeyEvents : true,
							width		: 410,
							pair		: '',
							clearable	: true ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-clss-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('clss_desc'));
								}
							}
						},{	xtype		: 'lookupfield',
							fieldLabel	: Language.get('', '작성주기' ),
							name		: 'istt_dvcd',
							editable	: false,
							width		: 206,
							lookupValue	: resource.lookup('search_all'),
							value		: ''
						},{	xtype		: 'popupfield',
							fieldLabel	: Language.get('drtr_name','작성담당'),
							name		: 'apvl_drtr_name_1fst',
							pair		: 'apvl_drtr_idcd_1fst',
							width		: 200,
							clearable	: true,
							margin		: '0 0 0 25',
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-user-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							},
							value	: _global.login_nm
						},{	xtype	: 'hiddenfield' ,
							name	: 'apvl_drtr_idcd_1fst',
							value	: _global.login_id
						},{	xtype		: 'lookupfield',
							name		: 'line_stat',
							width		: 200,
							fieldLabel	:  Language.get('line_stat', '사용여부'),
							lookupValue	: resource.lookup('line_stat'),
							value		: '0'
						}
					]
				}
			]
		};
		return line;
	}

});