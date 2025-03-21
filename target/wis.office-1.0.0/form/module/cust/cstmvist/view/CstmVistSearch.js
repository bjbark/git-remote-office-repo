Ext.define('module.cust.cstmvist.view.CstmVistSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-cstmvist-search',

	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1(),
			me.createLine2()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 거래처코드 또는 거래처명을 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					},
				]
			};
		return line;
	},

	createLine1 : function(){
		var	me	= this,
			line =
				{	xtype		: 'fieldset',
					title		: '상세검색',
					collapsible	: true,
					collapsed	: false,
					layout		: 'vbox', //,
					defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 4 25', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
							items : [
								{	fieldLabel	: '관리사업장',
									name		: 'owner_nm',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									pair		: 'mngt_bzpl_idcd',
									width		: 258,
									emptyText	: Const.infoNull.queryAll,
									clearable	: true,
									popup		: {
									widget		: 'lookup-bzpl-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, row_sts : '1'  },
										result	: function(records, nameField, pairField ){
											me.down('[name=mngt_bzpl_code]').setValue(records[0].get('bzpl_code'))
											nameField.setValue(records[0].get('bzpl_name'));
											pairField.setValue(records[0].get('bzpl_idcd'));
										}
									}
								},{	name		: 'mngt_bzpl_code', xtype : 'textfield' , hidden : true
								},{	name		: 'mngt_bzpl_idcd', xtype : 'textfield' , hidden : true
								},{	name		: 'dt_gb',
									xtype		: 'lookupfield',
									editable	: false,
									width		: 88	,
									lookupValue	: resource.lookup('search_all').concat( _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? [ ['1' , '등록일자'], ['2' , '수정일자' ] ] : [ ['1' , '방문일자'], ['2' , '작성일자'] ])  ,
									value		: '',
									margin		: '0 3 0 45'
								},{	name		: 'fr_dt',
									pair		: 'to_dt',
									root		:  true ,
									xtype		: 'betweenfield',
									width		: 100,
									margin		: '0 2 0 7',
									value		: ''
								},{	fieldLabel	: '~',
									name		: 'to_dt',
									pair		: 'fr_dt' ,
									xtype		: 'betweenfield',
									width		: 108,
									labelWidth	: 8,
									value		: ''
								},{	fieldLabel	: '사용여부',
									xtype		: 'lookupfield',
									name		: 'line_stat',
									editable	: false,
									width		: 178 ,
									labelWidth	: 87,
									lookupValue	: Resource.getList('search_all').concat( resource.lookup( 'line_stat')) ,
									value		: '',
									hidden		:  _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? false : true	
								}
							]
						}
					]
				};
		return line;
	},

	createLine2 : function(){
		var	me	= this,
			line ={
				xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 25',
				items	: [
					{	fieldLabel	: '거래처 분류'	,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						width		: 410,
						name		: 'clss_desc',
						pair		: '',
						margin		: '0 5 0 0',
						clearable	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-clss-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('clss_desc'));
								me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
								me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
								me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
							}
						}
					},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
					},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
					},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	:  Language.get( 'cstm_name' , '거래처'),
						xtype		: 'popupfield',
						maxLength	: 200,
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						clearable	: true ,
						width		: 210,
						hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						},
						hidden		:  _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false	
					},{	name		: 'cstm_idcd',  xtype : 'textfield', hidden : true
					},{	xtype		: 'checkbox',
						boxLabel	: '판매',
						name		: 'optn_1',
						checked		: true,
						style		: { color: 'Blue'},
						margin		: '0 0 0 45'
					},{	xtype		: 'checkbox',
						boxLabel	: '수출',
						name		: 'optn_2',
						checked		: false,
						style		: { color: 'Blue'},
						margin		: '0 0 0 20',
						hidden		: true,
					},{	xtype		: 'checkbox',
						boxLabel	: '매입',
						name		: 'optn_3',
						checked		: true,
						style		: { color: 'Blue'},
						margin		: '0 0 0 20'
					},{	xtype		: 'checkbox',
						boxLabel	: '수입',
						name		: 'optn_4',
						checked		: false,
						hidden		: true,
						style		: { color: 'Blue'},
						margin		: '0 0 0 20'
					},{	xtype		: 'checkbox',
						boxLabel	: '외주',
						name		: 'optn_5',
						checked		: true,
						style		: { color: 'Blue'},
						margin		: '0 0 0 20'
					},{	xtype		: 'checkbox',
						boxLabel	: '기타',
						name		: 'optn_6',
						checked		: true,
						style		: { color: 'Blue'},
						margin		: '0 0 0 20'
					}
				]
			}
		return line;
	}
});