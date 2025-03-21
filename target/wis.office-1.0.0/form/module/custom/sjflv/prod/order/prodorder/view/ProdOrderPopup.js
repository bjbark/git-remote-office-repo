Ext.define('module.custom.sjflv.prod.order.prodorder.view.ProdOrderPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-sjflv-prodorder-popup'			,

	title: '생산지시',

	closable: true,
	autoShow: true,
	width	: 820,
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
		me.items = [me.createForm()];
		me.callParent(arguments);

		me.selectAction();
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
				dockedItems	: [
					{	xtype : 'toolbar',
						dock  : 'bottom',
						items : [
							'->' ,
							{ text : '<span class="write-button">생산지시 </span>'	, scope: me , handler : me.finishAction , cls: 'button1-style'},,'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					},
					me.searchForm()
				],
				items : [me.createGrid()]
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
									width		: 200,
									labelWidth	: 65,
									value		: me.params.invc_numb,
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
									width		: 200,
									labelWidth	: 65,
									value		: me.params.records.data.item_code,
								},{	fieldLabel	: '제품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 295,
									labelWidth	: 65,
									value		: me.params.records.data.item_name,
								},{	fieldLabel	: '규격',
									name		: 'item_spec',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 280,
									labelWidth	: 65,
									value		: me.params.records.data.item_spec,
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('inqy_term','작업계획'),
									xtype		: 'datefield',
									name		: 'strt_dttm',
									width		: 195,
									labelWidth	: 65,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									value		: Ext.Date.parse(
													me.params.records.data.plan_sttm.substring(0, 8),
													'Ymd'
												),
								},{	text		: '~',
									xtype		: 'label',
									width		: 15,
									style		: 'text-align:center'
								},{	xtype		: 'datefield',
									name		: 'endd_dttm',
									width		: 120,
									format		: 'Y-m-d',
									submitFormat: 'Ymd',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									value		: Ext.Date.parse(
											me.params.records.data.plan_edtm.substring(0, 8),
											'Ymd'
										),
								},{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numberfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 165,
									labelWidth	: 65,
									value		: me.params.records.data.indn_qntt,
									fieldStyle	: 'text-align: right;',
//									listeners: {
//										afterrender: function(field) {
//											// 필요 시 추가 작업 가능
//											var rawValue = field.getValue();
//											field.setValue(Ext.util.Format.number(rawValue, '#,###.##9'));
//										}
//									}
								},{	fieldLabel	: '포장단위',
									name		: 'pckg_unit',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 140,
									labelWidth	: 65,
									value		: me.params.records.data.pckg_unit,
								},{	fieldLabel	: '라벨수',
									name		: 'labl_qntt',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 140,
									labelWidth	: 65,
									value		: me.params.records.data.labl_qntt,
								},
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('drtr_name','작업자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									name		: 'drtr_name',
									width		: 200,
									labelWidth	: 65,
									pair		: 'drtr_idcd',
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
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('cvic_name','생산설비'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cvic_name',
									pair		: 'cvic_idcd',
									width		: 200,
									labelWidth	: 65,
									clearable	: true,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cvic-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cvic_name'));
											pairField.setValue(records[0].get('cvic_idcd'));
										}
									}
								},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true,
								},{
									xtype: 'checkboxgroup',
									margin: '0 0 0 30',
									items: [
										{
											boxLabel: '용도 및 용법 첨부',
											name: 'usge_attc_yorn',
											width: 120,
										}
									],
									labelWidth: 1,
								}
							]
						},{	fieldLabel	: '제조방법',
							name		: 'remk_text',
							xtype		: 'textarea',
							width		: 800,
							height		: 60,
							labelWidth	: 65,
							value		: me.params.records.data.make_mthd,
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
				region		: 'center',
				scrollable	: true,
				height		: 200,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } ),
					scrollable: true,
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

				store: Ext.create('Ext.data.Store', {
					fields: ['acct_bacd','item_idcd', 'item_code', 'item_name', 'mixx_rate', 'need_qntt','ostt_qntt2','lott_numb','lott_numb_sum','used_yorn','used','revs_numb'],
					data: []  // 초기 데이터가 없으므로 빈 배열
				}),
				columns: [
					{	text : Language.get('item_code'	, '원료코드')	, dataIndex: 'item_code'	,  width : 100 , align:'center'
					},{	text : Language.get('item_name'	, '원료명'	)	, dataIndex: 'item_name'	,  width : 120 , align:'center'
					},{ text : Language.get('mixx_rate'	, '배합비'	)	, dataIndex: 'mixx_rate'	,  width : 80  , align:'center'
					},{ text : Language.get('need_qntt'	, '소용량'	)	, dataIndex: 'need_qntt'	,  width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,###.##9',
					},{ text : Language.get('ostt_qntt2', '투입량'	)	, dataIndex: 'ostt_qntt2'	,  width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,###.##9', hidden : true,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								},
							}
						}
					},{ text : Language.get(''	, '계량량'	)	, dataIndex: ''	,  width : 80  , align:'center', hidden : true,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									var grid = self.up('grid'),
//										store = me.getStore(),
//										selection = me.getSelectionModel().getSelection()[0],
//										row = store.indexOf(selection);
//									if (e.keyCode == e.ENTER) {
//										grid.plugins[0].startEdit(row+1, grid.columns[2]);
//									}else if(e.keyCode == e.TAB){
//										grid.plugins[0].startEdit(row, grid.columns[2]);
//									}
//								}
//							}
						}
					},{ text : Language.get('lott_numb'	, 'lot번호'	)	, dataIndex: 'lott_numb'	,  width : 120 , align:'center',
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									if(record.get('ostt_qntt2')>0){
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-lott-popup-sjflv',
											title	: 'Batch No 찾기',
											params : { stor_grp : _global.stor_grp , line_stat : '0' ,item_idcd : record.get('item_idcd'),stok_type_dvcd : '1' ,dvcd : '1',qntt:record.get('ostt_qntt2'),acct_bacd:record.get('acct_bacd')},
											result	: function(records) {
												Ext.Msg.confirm("확인", "원료를 투입하시겠습니까?", function(button) {
													if (button == 'yes') {
														var	parent = records[0];
														record.set('ostt_qntt2'		, parent.data.ostt_qntt);
														record.set('lott_numb' 		, parent.data.lott_numb);
														record.set('lott_numb_sum'	, parent.data.lott_numb_sum);
														record.set('used'		, '1');
//														me.cellEditAfter(grid, record, rowIndex);
													}else{
//														Ext.Msg.alert('알림','투입수량이 없습니다.');
														return;
													}
												})
											},
										})
									}else{
										Ext.Msg.alert('알림','투입수량이 없습니다.');
									}
								},
								scope : me
							},
						]
					},{ text : Language.get('lott_numb_sum'	, '소용량'	)	, dataIndex: 'lott_numb_sum'	,  hidden:true
					},{	text : Language.get('used'			, '사용여부')	, dataIndex: 'used'	,  width : 70 , align:'center',  xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							editable		: false,
							selectOnFocus	: true,
							enableKeyEvents : true,
							listeners:{

							}
						}
					},{	text : Language.get('used_yorn'	, '원료OEM')	, dataIndex: 'used_yorn'	,  width : 70 , hidden : true,
					},{	text : Language.get('revs_numb'	, 'bom차수')	, dataIndex: 'revs_numb'	,  width : 70 , hidden : true,
					},
				]
			}
		;
		return grid;
	},


	/**
	 * BOM조회
	 */
	selectAction :  function(){
		var me = this,
			grid = me.down('grid-panel'), // 그리드를 참조
			store = grid.getStore(),
			resId = _global.hq_id.toUpperCase()
		;

		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/prod/prodplan/get/item1.do',
			method		: "POST",
			params		: {
			 	token	: _global.token_id,
				param	: Ext.encode({
					stor_idc	: resId,
					item_idcd	: me.params.records.data.item_idcd,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					var indn_qntt = me.params.records.data.indn_qntt;
					result.records.forEach(function(record) {
						record.need_qntt = indn_qntt * (record.mixx_rate / 100);

						var need_qntt = indn_qntt * (record.mixx_rate / 100);
						record.ostt_qntt2 = need_qntt;
					});
					store.loadData(result.records);
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	/**
	 * 조회
	 */

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			baseform	= me.down('form'),
			record		= baseform.getRecord(),
			values		= baseform.getValues(),
			store		= me.down('grid-panel').getStore(),
			lister1		= Ext.ComponentQuery.query('module-sjflv-prodorder-lister1')[0].getStore(),
			param		= me.popup.params,
			uper_seqn	= 1
		;

		if(!values.strt_dttm || values.strt_dttm == null){
			Ext.Msg.alert("알림", "작업 시작 예정일자를 선택하여 주시기 바랍니다.");
			return
		}else if(!values.endd_dttm || values.endd_dttm == null){
			Ext.Msg.alert("알림", "작업 종료 예정일자를 선택하여 주시기 바랍니다.");
			return
		}else if(!values.cvic_name || values.cvic_name == null){
			Ext.Msg.alert("알림", "생산설비를 선택하여 주시기 바랍니다.");
			return
		}

		var invc_date = Ext.Date.format(new Date(),'Ymd');

		var records2 = [];
		var new_invc_numb;
		var bomt_degr = '';

		store.each(function(record) {
			var recordData = record.getData(); // 각 record 데이터를 가져옴
			bomt_degr = recordData.revs_numb;

			if(recordData.used == '1'){
				records2.push({
					_set			: 'insert',
					orig_invc_numb	: me.popup.params.invc_numb,
					orig_seqn		: '1',
					cstm_idcd		: values.cstm_idcd,
					wker_idcd		: values.drtr_idcd,
					line_seqn		: uper_seqn++,
					item_idcd		: recordData.item_idcd,
					item_name		: recordData.item_name,
					item_code		: recordData.item_code,
					lott_numb		: recordData.lott_numb,
					ivst_qntt		: recordData.ostt_qntt2 === '' ? 0 : recordData.ostt_qntt2,
					oem_yorn		: recordData.used_yorn,
					wkod_numb		: values.invc_numb,
					bomt_degr		: bomt_degr,
				});
			}
		});

		Ext.Msg.confirm("확인", "생산을 시작하시겠습니까?", function(button) {
			if (button == 'yes') {
				//work_book
				Ext.Ajax.request({
					url : _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'work_book'
						})
					},
					async	: false,
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;

						records2.forEach(function(record) {
							record.new_invc_numb = new_invc_numb; // record를 사용하여 각 배열 요소 수정
						});

						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/sjflv/prod/prodorder/set/record.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									records :[{
										_set			: 'insert',
										invc_numb		: values.invc_numb,
										wkod_dvcd		: '1',
										bzpl_idcd		: '100',
										pdod_date		: invc_date,
										acpt_numb		: me.params.records.data.acpt_numb,
										acpt_amnd_degr	: '1',
										acpt_seqn		: me.params.records.data.acpt_seqn,
										cstm_idcd		: me.params.records.data.cstm_idcd,
										pdsd_numb		: me.params.records.data.invc_numb,
										pdsd_seqn		: '1',
										pdsd_date		: me.params.records.data.pdsd_date,
										pref_rank		: me.params.records.data.pref_rank,
										item_idcd		: me.params.records.data.item_idcd,
										strt_dttm		: values.strt_dttm,
										endd_dttm		: values.endd_dttm,
										indn_qntt		: values.indn_qntt,
										prog_stat_dvcd	: '0',

										line_seqn		: '1',
										cvic_idcd		: values.cvic_idcd,
										orig_invc_numb	: me.params.records.data.invc_numb,
										wker_idcd		: values.drtr_idcd,
										plan_strt_dttm	: values.strt_dttm,
										plan_endd_dttm	: values.endd_dttm,
										usge_attc_yorn	: values.usge_attc_yorn,
										acpt_qntt		: me.params.records.data.acpt_qntt,
										stok_used_qntt	: me.params.records.data.stok_asgn_qntt,
										remk_text		: values.remk_text,
										user_memo		: values.remk_text,
										pckg_unit		: values.pckg_unit,
										cofm_yorn		: '1',
										pckg_unit		: values.pckg_unit,
										labl_qntt		: values.labl_qntt,
										new_invc_numb	: new_invc_numb,
										wkod_numb		: values.invc_numb,
										bomt_degr		: bomt_degr,
									}],
									records2		: records2,
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								Ext.Msg.alert("알림", "생산지시가 입력되었습니다.");
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
								lister1.reload();
							}
						})
					}
				});
			}
		});
	}
});