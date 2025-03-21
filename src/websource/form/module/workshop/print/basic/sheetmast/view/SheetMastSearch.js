Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-sheetmast-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1()];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line =
				{	xtype	: 'fieldset',
					border	: 0,
					style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
					region	: 'center',
					width	: '100%',
					height	: 40,
					margin	: '0 40 0 40',
					items	:[
						{	xtype		: 'fieldset',
							border		: 3,
							flex		: 1,
							style		: { borderColor : '#000081', borderStyle : 'solid' },
							region		: 'center',
							height		: 34,
							margin 	: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		:[
								{	xtype		: 'label'			,
									fieldCls	: 'requiredindex'	,
									text		: 'SEARCH  | '		,
									margin		: '5 10 0 0'		,
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name'		,
									xtype		: 'searchfield'		,
									flex		: 4					,
									emptyText	: '조회할 용지코드 또는 용지명을 입력하세요...',
									enableKeyEvents : true			,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												var searchButton = self.up('form').down('[action=selectAction]');
												searchButton.fireEvent('click', searchButton); //조회버튼클릭
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
			};
		return line;
	},

	/**
	 * 검색 조건 첫라인
	 */
	createLine1 : function() {
		var me = this,
			line = {
			xtype		: 'fieldset',
			title		: '상세검색',
			collapsible	: true,
			collapsed	: true,
			items		: [
					{	fieldLabel	: Language.get('','용지분류'),
						xtype		: 'popupfield'	,
						name		: 'clss_desc'	,
						pair		: 'lcls_idcd'	,
						editable	: true,
						margin		: '10 5 10 20',
						width		: 300,
						enableKeyEvents : true,
						clearable	: true ,
							popup	: {
								select : 'SINGLE',
								widget : 'lookup-item-clss-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									nameField.setValue(records[0].get('clss_desc'));
								}
							},
					listeners	: {
						change	: function(){
							var val = this.getValue();
							if( val == '' || val == null ){
								me.down('[name=lcls_idcd]').reset();
								me.down('[name=mcls_idcd]').reset();
								me.down('[name=scls_idcd]').reset();
							}
						}
					}
					},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
					}
			]
		};
		return line;
	},


});