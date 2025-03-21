Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-sjdashboard-search',
	/**
	 * 초기화 메소드
	 */
	initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(),me.createLine1() ];
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
				,height  : 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_nm'     ,
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
	/**
	 * 검색 조건 첫라인
	 */
	createLine1 : function() {
		var line = {
			xtype		: 'fieldset',
			title		: '상세검색',
			hidden		: true,
			collapsible	: true,
			collapsed	: true,
			items		: [
				{	fieldLabel	: Language.get('','사업부'),
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					name		: 'item_name',
					pair		: 'item_idcd',
					hidden		: _global.hq_id =='N1000nbolt',
					clearable	: true,
					width		: 300,
					popup		: {
						select  : 'SINGLE',
						widget  : 'lookup-item-popup',
						params  : { stor_grp : _global.stor_grp , line_stat : '0' },
						result  : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('item_name'));
							pairField.setValue(records[0].get('item_idcd'));
							me.down('[name=acct_code]').setValue(records[0].get('acct_bacd'));
							me.down('[name=acct_bacd_name]').setValue(records[0].get('acct_bacd_name'));
						}
					}
				},{	fieldLabel	: Language.get('','담당자'),
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					name		: 'item_name',
					pair		: 'item_idcd',
					hidden		: _global.hq_id =='N1000nbolt',
					clearable	: true,
					width		: 300,
					popup		: {
						select  : 'SINGLE',
						widget  : 'lookup-item-popup',
						params  : { stor_grp : _global.stor_grp , line_stat : '0' },
						result  : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('item_name'));
							pairField.setValue(records[0].get('item_idcd'));
							me.down('[name=acct_code]').setValue(records[0].get('acct_bacd'));
							me.down('[name=acct_bacd_name]').setValue(records[0].get('acct_bacd_name'));
						}
					}
				},{	fieldLabel	: Language.get('acpt_date','등록기간'),
					xtype		: 'betweenfield',
					name		: 'invc1_date',
					pair		: 'invc2_date',
					labelWidth	: 99,
					width		: 198,
					margin		: '0 0 0 2',
					root		: true,
					value		: ''
				},{	xtype		: 'betweenfield',
					fieldLabel	:'~',
					name		: 'invc2_date',
					pair		: 'invc1_date',
					labelWidth	: 15,
					width		: 115,
					value		: ''
				}
			]
		};
		return line;
	},

	addonSearch : function(){
		var line = {
			xtype		: 'fieldset',
			layout		: 'vbox',
			defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 0', padding:'0', border: 0 },
			items		: [
				{	xtype	: 'fieldset',
					items	: [

					]
				}
			]
		};
		return line;
	}


});