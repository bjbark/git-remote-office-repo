Ext.define('module.prod.plan.plananallist.view.PlanAnalListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-plananallist-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic(),me.createLine1(), me.createLine2()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin : '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText	: '조회할 품목코드 또는 품명을 입력하세요...',
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

	createLine1 : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				layout	: 'hbox',
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'lookupfield',
						name		: 'date_dvcd',
						editable	: false,
						width		: 140,
						margin		: '0 0 0 5',
						lookupValue	: [['1','납기일자'],['2','수주일자'],['3','지시일자'],['4','생산계획일']],
						value		: '1'
					},{	xtype		: 'betweenfield',
						name		: 'fr_dt',
						pair		: 'to_dt',
						width		: 95,
						margin		: '0 0 0 2',
						root		: true,
						required	: true,
						fieldCls	: 'requiredindex',
						value		: Ext.Date.getFirstDateOfMonth(new Date()),
					},{	xtype		: 'betweenfield',
						fieldLabel	:'~',
						name		: 'to_dt',
						pair		: 'fr_dt',
						labelWidth	: 15,
						width		: 115,
						value		: Ext.Date.getLastDateOfMonth(new Date()),
						required	: true,
						fieldCls	: 'requiredindex',
					},,{	fieldLabel	: Language.get('item','품목'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						width		: 300,
						labelWidth	: 72,
						name		: 'item_name',
						pair		: 'item_idcd',
						emptyText	: Const.infoNull.queryAll,
						clearable	: true ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-item-popup',
							params	: { stor_grp : _global.stor_grp , row_sts : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						},
						listners	: {
							change	: function() {
							var val = this.getValue();
								if(val=='' || val == null){
								me.down('[name=item_idcd]').reset();
								}
							}
						}
					},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
					},{	name		: 'lott_numb' ,
						xtype		: 'searchfield' ,
						fieldLabel	: 'LOT 번호',
						width		: 215  ,
						labelWidth	: 70,
						margin		: '0 0 0 2',
						clearable	: true,
						readOnly	: false ,
						allowBlank	: true,
						emptyText	: Const.infoNull.queryAll
					}
				]
			};
		return line;
	},

	createLine2 : function(){
		var me = this,
			line =
				{	xtype : 'fieldset',
					layout: 'hbox',
					margin	: '3 40 0 40',
					items : [
						{	xtype		: 'lookupfield',
							name		: 'search_dvcd',
							editable	: false,
							width		: 140,
							margin		: '0 0 0 5',
							lookupValue	: [['1','생산번호'],['3','요청 메모']],
							value		: '1'
						},{	name		: 'search_name' ,
							xtype		: 'searchfield' ,
							width		: 210  ,
							margin		: '0 0 0 2',
							clearable	: true,
							readOnly	: false ,
							allowBlank	: true,
							emptyText	: Const.infoNull.queryAll//,
						},{	fieldLabel	: Language.get('cstm', '거래처' ),
							width		: 300,
							labelWidth	: 72,
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							emptyText	: Const.infoNull.queryAll,
							clearable	: true,
							popup 		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_id : _global.stor_id },
								result	: function(records, nameField, pairField ){
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							listners	: {
								change	: function() {
									var val = this.getValue();
									if(val=='' || val == null){
										me.down('[name=cstm_idcd]').reset();
									}
								}

							}
						},{	xtype : 'textfield',  name : 'cstm_idcd' , hidden: true
						},{	fieldLabel	: Language.get('PRCS_STAT', '주문상태'),
							width		: 217,
							labelWidth	: 72,
							xtype		: 'lookupfield',
							name		: 'ordr_dvcd',
							multiSelect	: false ,
							editable	: false,
							lookupValue	: resource.lookup('search_all').concat(resource.lookup('ordr_dvcd' )),
							value		: ''
						}
					]
				};
		return line;
	}
});