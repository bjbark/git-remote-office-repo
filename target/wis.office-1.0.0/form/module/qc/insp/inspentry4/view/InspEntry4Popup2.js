Ext.define('module.qc.insp.inspentry4.view.InspEntry4Popup2', { extend: 'Axt.popup.Search',
	alias: 'widget.module-inspentry4-popup2',
	
	store	: 'module.qc.insp.inspentry4.store.InspEntry4Popup2',
	title	: Language.get('','검사성적서 입력'),
	closable: true,
	autoShow: true,
	width	: 590,
	height	: 500,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]
			};
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dock		: 'top',
			dockedItems	: [
				{	xtype	: 'fieldset',
					margin	: '3 0 3 0',
					layout	: 'hbox',
					border	: 0,
					fieldDefaults	: { height : 23, width : 100, labelWidth : 45, labelSeparator : '', margin: '0 0 0 15'},
					items	: [
						{	fieldLabel	: Language.get('','검사일자'),
							xtype		: 'datefield',
							name		: 'invc_date',
							width		: 150,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date()
						},{	fieldLabel	: Language.get('','생산수량'),
							xtype		: 'numericfield',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							name		: 'prod_qntt',
							value		: me.popup.params.get('prod_qntt'),
						},{	fieldLabel	: Language.get('','불량수량'),
							xtype		: 'numericfield',
							name		: 'poor_qntt',
							fieldCls	: 'requiredindex',
						},{	fieldLabel	: Language.get('','합격수량'),
							xtype		: 'numericfield',
							name		: 'pass_qntt',
							fieldCls	: 'requiredindex',
						}
					]
				},{	xtype	: 'fieldset',
					margin	: '3 0 3 0',
					layout	: 'hbox',
					border	: 0,
					fieldDefaults	: { height : 23, width : 100, labelWidth : 45, labelSeparator : '', margin: '0 0 0 15'},
					items	: [
						{	fieldLabel	: Language.get('wkct_insp_dvcd','검사구분'),
							xtype		: 'lookupfield',
							name		: 'wkct_insp_dvcd',
							width		: 150,
							labelWidth	: 45,
							margin		: '0 0 0 15',
							value		: '3000',
							lookupValue	: resource.lookup('wkct_insp_dvcd'),
									listeners:{
										render:function(a, b){
											function isBigEnough(element, index, array) {
												return (element[0] == 3000);
											}
											var lookupVal = resource.lookup('wkct_insp_dvcd').filter(isBigEnough);
											this.setLookupValue(lookupVal);
										}
									}
						},{	fieldLabel	: Language.get('','검사유형'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 215,
							name		: 'insp_type_name',
							pair		: 'insp_type_idcd',
							clearable	: false ,
							fieldCls	: 'requiredindex',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-insptype-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('insp_type_name'));
									pairField.setValue(records[0].get('insp_type_idcd'));
									me.down('grid').select({
										callback:function(records, operation, success) {
											if (success) {
											}
										}, 
										scope:me
									}, Ext.merge( {stor_id : _global.stor_id, insp_type_idcd: records[0].get('insp_type_idcd')} ));
								}
							}
						},{	xtype	: 'textfield',
							name	: 'insp_type_idcd',
							hidden	: true
						},{	fieldLabel	: Language.get('','판정구분'),
							xtype		: 'lookupfield',
							name		: 'judt_dvcd',
							width		: 120,
							lookupValue	: resource.lookup('judt_dvcd'),
							value		: '1'
						}
					]
				},{	xtype	: 'fieldset',
					hidden	: true,
					items	: [
						{	xtype	: 'textfield',
							name	: 'isMaster',
							value	: 'true'
						},{	xtype	: 'textfield',
							name	: 'orig_line_seqn',
							value	: '1'
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'cellmodel'},
				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { 
					ptype  : 'cellediting-directinput', 
					clicksToEdit: 1,
					listeners: {
						beforeedit: function(editor, context) {
							if (context.record.get('rslt_iput_dvcd') === '2000') {
								context.column.setEditor({
									xtype: 'textfield',
									allowBlank: false,
									enableKeyEvents: true,
									listeners: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												me.keyEvent(self);
											}
										}
									}
								});
								context.column.align = 'center';
								context.column.renderer = '';
							} else {
								context.column.setEditor({
									xtype: 'numberfield',
									allowBlank: false,
									enableKeyEvents: true,
									listeners: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												me.keyEvent(self);
											}
										}
									}
								
								});
								context.column.align = 'right';
								context.column.renderer = function(val) {
									return Ext.util.Format.number(val, '0,000.###');
								}
							}
						}
					} 
				},
				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text: Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text: Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	text: Language.get('line_seqn'		, '순번'	)	, dataIndex: 'line_seqn'		, style: 'text-align:center'	, width : 45 	, align:'center'
					},{	text: Language.get('insp_sbsc_name'	, '검사항목')	, dataIndex: 'insp_sbsc_name'	, style: 'text-align:center'	, minWidth : 150, flex: 1
					},{ text : Language.get('insp_cond'		, '검사조건')	, dataIndex: 'insp_cond'		, style: 'text-align:center'	, minWidth : 150, flex: 1
					},{	text : Language.get('msmt_valu'		, '측정값'	)	, dataIndex: 'msmt_valu'		, style: 'text-align:center'	, width : 65	, tdCls : 'editingcolumn' ,
						editor: {
							xtype: 'numberfield',
							allowBlank: false,
						}
					}
				],
			}
		;
		return grid;
	},

	/**
	 * 확인 버튼 이벤트 [삼정, 삼정향료]
	 */
	finishAction: function(){
		var me		= this,
			isValid = true,
			isRequiredFilled = true,
			invcNumb= undefined,
			seqn	= 1,
			values	= Ext.merge(me.down('form').getValues(), {_set: 'insert', crte_idcd: _global.login_id, updt_idcd: _global.login_id}),
			store	= me.down('grid').getStore(),
			data	= [Ext.merge(me.popup.params.getData(), Ext.merge(values, {insp_qntt: Number(values.pass_qntt) + Number(values.poor_qntt)}))]
		;
		Ext.each(store.getRange(), function(rec){
			if (rec.get('msmt_valu') == "" || rec.get('msmt_valu') == undefined) {
				isValid = false;
				return false;
			}
			Ext.merge(rec.data, {orig_line_seqn: values.orig_line_seqn, assi_seqn: seqn, _set: 'insert', crte_idcd: _global.login_id, updt_idcd: _global.login_id})
			data.push(rec.data);
			seqn++;
		});
		
		me.down('form').queryBy(function(comp) {
			if (comp.fieldCls == 'requiredindex') {
				if (comp.value === null || comp.value === undefined || comp.value === "") {
					isRequiredFilled  = false;
				}
			}
		});
		
		if (!isRequiredFilled ) {
			Ext.Msg.alert('알림', '모든 필수 입력값을 입력해주세요.');
			return false;
		}
		if (((Number(values.poor_qntt) + Number(values.pass_qntt)) > Number(values.prod_qntt)) || ((Number(values.poor_qntt) + Number(values.pass_qntt)) < Number(values.prod_qntt))) {
			Ext.Msg.alert('알림', '합격수량과 불량수량의 합은 생산수량과 동일해야 합니다. 정확한 값을 입력해주세요.');
			return false;
		}
		if (!isValid) {
			Ext.Msg.alert('알림', '측정값을 모두 입력해주세요.');
			return false;
		}
		
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'last_insp'
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				invcNumb = result.records[0].seq;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		
		Ext.each(data, function(rec) {
			Ext.merge(rec, {invc_numb: invcNumb});
		})
		
		Ext.Ajax.request({
			url		: _global.location.http () + '/qc/insp/inspentry4/set/lastinsp.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					records: data
				})
			},
			async	: false,
			success : function(response, request) {
				Ext.Msg.alert('알림', '검사실적등록 완료.');
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
				me.popup.master.getStore().reload();
				me.close();
			}
		});
	},
	
	keyEvent: function(self) {
		var grid = self.up('grid'),
			editingPlugin = grid.plugins[0],
			store = grid.getStore(),
			selection = grid.getSelectionModel().getSelection()[0],
			currentRowIdx = store.indexOf(selection),
			columnIdx = grid.headerCt.getHeaderIndex(self.column),
			nextRowIdx = currentRowIdx + 1;
			
		
		if (nextRowIdx < store.getCount()) {
			editingPlugin.startEditByPosition({
				row: nextRowIdx,
				column: columnIdx
			});
		}
	}
});
