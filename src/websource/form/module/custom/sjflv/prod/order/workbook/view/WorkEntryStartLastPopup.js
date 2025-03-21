Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkEntryStartLastPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-workentry-popup-start-first-last'			,

	title: '생산시작',

	closable: true,
	autoShow: true,
	width	: 730,
	height	: 450,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		// mtrl_records 데이터를 Grid의 store로 설정

		console.log(me.popup.params.mtrl_records);
		var mtrlRecords = me.popup.params.mtrl_records || []; // 데이터가 없을 경우 빈 배열 사용

		me.gridStore = Ext.create('Ext.data.Store', {
			fields: ['item_code', 'item_name', 'ivst_qntt','real_ivst_qntt','lott_numb'], // 필드 정의
			data: mtrlRecords // mtrl_records 데이터 삽입
		});

		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-panel' ,
				region		: 'center',
				border		: false,
				dockedItems	: [
					{	xtype : 'toolbar',
						dock  : 'bottom',
						items : [
							'->' ,
							{ text : '<span class="write-button">생산시작 </span>'	, scope: me , handler : me.startAction  , cls: 'button1-style'},,'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items : [me.searchForm(), me.createGrid()]
			};
		return form;
	},

	searchForm: function(){
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			margin	: '0 0 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype	: 'panel',
							layout	: 'hbox',
							margin	: '5 0 5 0',
							border	: 0,
							items	: [
								{	fieldLabel	: '지시번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.invc_numb
								},{	fieldLabel	: '거래처명',
									name		: 'cstm_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.cstm_name
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '제품코드',
									name		: 'item_code',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.item_code
								},{	fieldLabel	: '제품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 300,
									labelWidth	: 65,
									value		: me.popup.params.item_name
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('inqy_term','계획일자'),
									xtype		: 'textfield',
									name		: 'plan_strt_dttm',
									width		: 300,
									labelWidth	: 65,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_strt_dttm.substring(0, 10),
								},{	text		: '~',
									xtype		: 'label',
									width		: 35,
									style		: 'text-align:center'
								},{	xtype		: 'textfield',
									name		: 'plan_endd_dttm',
									width		: 265,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									value		: me.popup.params.plan_endd_dttm.substring(0, 10),
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: Ext.util.Format.number(me.popup.params.indn_qntt, '#,###.##9'),
								},{	fieldLabel	: '포장단위',
									name		: 'pckg_unit',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.pckg_unit
								},{	fieldLabel	: '라벨수',
									name		: 'labl_qntt',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
									value		: me.popup.params.labl_qntt
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('item','생산설비'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cvic_name',
									pair		: 'cvic_idcd',
									width		: 300,
									labelWidth	: 65,
									clearable	: true,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									value		: me.popup.params.cvic_name,
									readOnly	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cvic-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cvic_name'));
											pairField.setValue(records[0].get('cvic_idcd'));
										}
									}
								},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true, value : me.popup.params.cvic_idcd,
								},{	fieldLabel	: Language.get('drtr_name','작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'drtr_name',
									width		: 300,
									labelWidth	: 65,
									pair		: 'drtr_idcd',
									value		: _global.login_nm,
									readOnly	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									},
									listeners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=drtr_idcd]').reset();
											}
										}
									}
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true , value : _global.login_pk
								},
							]
						},{	fieldLabel	: Language.get('strt_dttm','시작일시'),
							xtype		: 'datetimefield',
							name		: 'strt_dttm',
							width		: 300,
							labelWidth	: 65,
							hourText	: 'H',
							minuteText	: 'M',
							todayText	: '오늘',
							format		: 'Y-m-d H:i',
							submitFormat: 'YmdHi',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							readOnly	: true,
							value		: new Date(),
						},
					]
				},
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
				region		: 'bottom',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },
				scrollable	: true,
				height		: 200,

				store		: me.gridStore,
				columns: [
					{	text : Language.get('item_code'	, '원료코드')	, dataIndex: 'item_code'	,  width : 180, align:'center'
					},{	text : Language.get('item_name'	, '원료명'	)	, dataIndex: 'item_name'	,  width : 180, align:'center'
					},{ text : Language.get('ivst_qntt'	, '소요량'	)	, dataIndex: 'ivst_qntt'	,  width : 100 , align:'center', xtype : 'numericcolumn', format : '#,##0.###'
					},{ text : Language.get('real_ivst_qntt', '실제투입량'	)	, dataIndex: 'real_ivst_qntt'	,  width : 100 , align:'center', xtype : 'numericcolumn', format : '#,##0.###'
					},{	text : Language.get('lott_numb'	, 'LotNo'	)	, dataIndex: 'lott_numb'		,  width : 130 , align:'center'
					},
				]
			}
		;
		return grid;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	startAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			uper_seqn   = 1,
			lister1= Ext.ComponentQuery.query('module-sjflv-workbook-lister')[0],
			select = lister1.getSelectionModel().getSelection()
		;

		Ext.Msg.confirm("확인", "생산을 시작하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/prod/workbook/set/setMaster.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							_set			: 'update',
							//pror_mast 및 pror_item
							wkod_numb		: me.popup.params.invc_numb,
							wkod_seqn		: '1',
							prog_stat_dvcd	: '1',
							mtrl_ivst_yorn	: '1',
							work_date		: Ext.Date.format(new Date(),'Ymd'),
							cvic_idcd		: me.popup.params.cvic_idcd,
							wker_idcd		: me.popup.params.drtr_idcd,
							usge_attc_yorn	: me.popup.params.usge_attc_yorn,
							pckg_unit		: me.popup.params.pckg_unit,

							//work_book
							invc_numb		: me.popup.params.work_invc,
							records			: me.popup.params.mtrl_records,
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						Ext.Msg.alert("알림", "생산시작이 되었습니다.");
						lister1.getStore().reload();
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							me.setResponse( {success : true , values :  values });
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				})
			}else{
				return;
			};
		});
	},
});