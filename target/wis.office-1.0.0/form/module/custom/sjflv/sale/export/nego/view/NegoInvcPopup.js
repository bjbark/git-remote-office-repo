Ext.define('module.custom.sjflv.sale.export.nego.view.NegoInvcPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-nego-invc-popup',

	title		: '수출 Nego 입력',
	closable	: true,
	autoShow	: true,
	width		: 930 ,
	height		: 625,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'panel',
					dock  : 'top',
					items:[
						me.editorForm()
					]
				},{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.createGrid() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			form = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 180,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', 'Nego No' ),
										xtype		: 'textfield',
										name		: '',
										allowBlank	: false ,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',

									},{ xtype		: 'lookupfield',
										name		: 'line_stat',
										lookupValue	: resource.lookup('line_stat'),
										margin		: '1 0 0 2',
										width		: 60
									},{	fieldLabel	: Language.get('', '관리번호' ),
										xtype		: 'textfield',
										name		: '',
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
									},{	fieldLabel	: Language.get('invc_numb','Invoice No'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'invc_numb',
										clearable	: true,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-invc-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('bzpl_name'));
											}
										}
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('bzpl_name','사업장'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'bzpl_name',
										pair		: 'bzpl_idcd',
										clearable	: true,
										width		: 262,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-bzpl-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('bzpl_name'));
												pairField.setValue(records[0].get('bzpl_idcd'));
											}
										}
									},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('','입금일자'),
										xtype		: 'datefield',
										name		: '',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
									},{	fieldLabel	: Language.get('expt_dvcd','수출구분'),
										xtype		: 'lookupfield',
										name		: 'expt_dvcd',
										lookupValue	: resource.lookup('expt_dvcd'),
									},
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('buyr_name', 'Buyer' ),
										xtype		: 'textfield',
										name		: 'buyr_name',
										width		: 262,
									},{	fieldLabel	: Language.get('mdtn_prsn', '중개인' ),
										xtype		: 'textfield',
										name		: 'mdtn_prsn',
									},{	fieldLabel	: Language.get('drtr_name','담당자'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'drtr_name',
										pair		: 'drtr_idcd',
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-user-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
											}
										}
									},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('unit_name','화폐단위'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'unit_name',
										pair		: 'unit_idcd',
										clearable	: true,
										width		: 262,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-unit-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('unit_name'));
												pairField.setValue(records[0].get('unit_idcd'));
											}
										}
									},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('', '환율' ),
										xtype		: 'numericfield',
										name		: '',
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('', 'Remarks' ),
										xtype		: 'textfield',
										name		: 'user_memo',
										width		: 862,
									}
								]
							}
						]
					}
				]
			};
		return form;
	},
	createGrid: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			header		: false,
			split		: true,
			flex		: 1,
			border		: 1,
			height		: 380,
			dockedItems	: [me.searchForm()],
			viewConfig	: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
				markDirty: false,
			},
			selModel: {	selType: 'checkboxmodel', mode : 'MULTI' },
//			store	: Ext.create(me.store),
			columns: [
				{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width :  50 , align : 'center'
				},{ dataIndex: 'acpt_numb'	, text : Language.get(''	,'입금구분'		) , width : 120 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
				},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'입금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
				},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'원화입금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
				},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'금융기관'		) , width : 100
				},{ dataIndex: 'item_name'	, text : Language.get(''	,'계좌번호'		) , width : 160
				},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'수수료'		) , width : 100 , xtype : 'numericcolumn', align : 'right'
				},{ dataIndex: 'item_name'	, text : Language.get(''	,'입금통보일'		) , width : 100,align:'center'
				},{ dataIndex: 'item_name'	, text : Language.get(''	,'비고'			) , flex : 1 ,minWidth : 200,align:'center'
				}
			],
		};
		return grid;
	},
	searchForm: function(){
		var me = this,
			form = {
			xtype  : 'form-search',
			layout : { type: 'vbox' },
			flex   : 1,
			fieldDefaults: {  width : 260, labelWidth : 60, labelSeparator : '' },
			items  :	[
				{	xtype : 'fieldset',
					margin : '0 0 0 0' ,
					items  : [
						{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 120,
							items	: [
								{	text		: '입금구분' , xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'lookupfield',
									name		: '',
									margin		: '2 2 2 2',
									lookupValue	: resource.lookup(''),
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
											} else if (e.keyCode == e.ESC) {
												me.attachItem({ clear : true });
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 100 ,
							items	: [
								{	text		: '입금액', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'numericfield',
									name		: '',
									margin		: '2 2 2 2',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
											} else if (e.keyCode == e.ESC) {
												me.attachItem({ clear : true });
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 100 ,
							items	: [
								{	text		: '원화입금액', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'numericfield',
									name		: '',
									margin		: '2 2 2 2',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
											} else if (e.keyCode == e.ESC) {
												me.attachItem({ clear : true });
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldcontainer' ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
							width	: 150 ,
							margin	: '3 0 3 0',
							items	: [
								{	text		: '금융기관', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
								},{	xtype		: 'textfield',
									margin		: '2 2 2 2',
									name		: '',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
//												panel.down('[name=invc_qntt]').focus(true, 10);
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldcontainer' ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
							width	: 130 ,
							margin	: '3 0 3 0',
							items	: [
								{	text		: '계좌번호', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
								},{	xtype		: 'textfield',
									margin		: '2 2 2 2',
									name		: '',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
//												panel.down('[name=invc_qntt]').focus(true, 10);
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 80 ,
							items	: [
								{	text		: '수수료', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'numericfield',
									name		: '',
									margin		: '2 2 2 2',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
											} else if (e.keyCode == e.ESC) {
												me.attachItem({ clear : true });
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 100 ,
							items	: [
								{	text		: '입금통보일', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'datefield',
									editable	: true,
									enableKeyEvents : true,
									margin		: '2 2 2 2',
									name		: '',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
								}
							]
						},{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 130 ,
							items	: [
								{	text		: '비고', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'textfield',
									editable	: true,
									enableKeyEvents : true,
									margin		: '2 2 2 2',
									name		: '',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
								}
							]
						}
					]
				}
			] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-estimast1-lister-master')[0],
			detail	= Ext.ComponentQuery.query('module-estimast1-lister-detail')[0],
			record
		;

		if(values.deli_date==''){
			Ext.Msg.alert("알림","납기일자를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Msg.confirm("확인", "주문등록을 하시겠습니까?", function(button) {
				if (button == 'yes') {

					record = String(me.params.param).slice(0,-3)+",\"deli_date\":\""+values.deli_date+"\"}]}";

					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/estimast1/set/acpt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								records		: record,
							})
						},
						async : false,
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText),
								invcs  = ''
							;

							invcs += result.records[0].new_invc_numb;

							if(result.records.length > 1){
								for(var i = 1; i < result.records.length; i++){
									invcs += '],<br>['+ result.records[i].new_invc_numb;
								}
							}

							Ext.Msg.alert("알림","주문번호 <br>[<span style='color:blue;'>"+ invcs +"</span>]<br>으로 등록이 완료 되었습니다.");
							me.setResponse( {success : true});
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							master.getStore().reload();
						},
						finished : function(results, record, operation){
						}
					});
				}
			});
			mask.hide();
		}
	}
});
