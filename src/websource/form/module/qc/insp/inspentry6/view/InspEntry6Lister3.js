Ext.define('module.qc.insp.inspentry6.view.InspEntry6Lister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry6-lister3',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.qc.insp.inspentry6.store.InspEntry6Lister3',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : '<span class="write-button">재작업지시</span>'	, action : 'reWorkAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',
//					{	text : '<span class="write-button">반품</span>'	, action : 'returnAction'		, cls: 'button1-style',
////						hidden	: !_global.auth.auth_sale_1003
//					} ,
					{	text : '<span class="write-button">폐기</span>'	, action : 'dropAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : '<span class="write-button">특채</span>'	, action : 'specialAction'		, cls: 'button1-style',
//						hidden	: !_global.auth.auth_sale_1003
					} , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'INOVICE번호')	, width : 120 , align : 'center', hidden : true
					},{ dataIndex: 'bzpl_idcd'		, text : Language.get('bzpl_idcd'		,'사업장ID')		, width : 80  , align : 'center', hidden : true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')		, width : 80  , align : 'center', hidden : true
					},{ dataIndex: 'spts_seqn'		, text : Language.get('spts_seqn'		,'순번')			, width : 50  , align : 'center',
					},{ dataIndex: 'spts_numb'		, text : Language.get('spts_numb'		,'출고의뢰번호')	, width : 140 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('spts_numb')
					},{ dataIndex: 'invc_date'		, text : Language.get('ostt_date'		,'출고일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'spts_date'		, text : Language.get('spts_date'		,'출고의뢰일자')	, width : 80  , hidden : true
					},{ dataIndex: 'spts_dept_idcd'	, text : Language.get('spts_dept_idcd'	,'출고의뢰부서ID')	, width : 80  , hidden : true
					},{ dataIndex: 'spts_drtr_idcd'	, text : Language.get('spts_drtr_idcd'	,'출고의뢰담당자ID'), width : 90  , hidden : true
					},{ dataIndex: 'item_idcd'		, text : Language.get('item_idcd'		,'품목ID')		, width : 90  , hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')			, width : 350 , align : 'left'
					},{ dataIndex: 'unit_idcd'		, text : Language.get('unit_idcd'		,'단위ID')		, width : 80  , hidden : true
					},{ dataIndex: 'spts_qntt'		, text : Language.get('spts_qntt'		,'출고의뢰수량')	, width : 90  , xtype : 'numericcolumn'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		, width : 100 ,
					},{ dataIndex: 'wrhs_idcd'		, text : Language.get('wrhs_idcd'		,'창고ID')		, width : 80  , hidden : true
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'		,'창고명')		, width : 80  , align : 'left'
					},{ dataIndex: 'cstm_idcd'		, text : Language.get('cstm_idcd'		,'거래처ID')		, width : 80  , xtype : 'numericcolumn', hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')		, width : 180 , align : 'center'
					},{ dataIndex: 'insp_drtr_idcd'	, text : Language.get('insp_drtr_idcd'	,'검사담당자ID')	, width : 80  , align : 'center', hidden : true
					},{ dataIndex: 'insp_drtr_name'	, text : Language.get('insp_drtr_name'	,'검사담당자')		, width : 100 , align : 'left'
					},{ dataIndex: 'insp_qntt'		, text : Language.get('insp_qntt'		,'검사수량')		, width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'pass_qntt'		, text : Language.get('pass_qntt'		,'합격수량')		, width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량')		, width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'rett_qntt'		, text : Language.get('rett_qntt'		,'반품수량')	, width : 80  , align : 'right' ,xtype : 'numericcolumn'
					},{ dataIndex: 'dsse_qntt'		, text : Language.get('dsse_qntt'		,'폐기수량')	, width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'scex_qntt'		, text : Language.get('scex_qntt'		,'특채수량')	, width : 80  , align : 'right' ,xtype : 'numericcolumn'
					},{ dataIndex: 'rewk_qntt'		, text : Language.get('rewk_qntt'		,'재작업수량')	, width : 80  , align : 'right' ,xtype : 'numericcolumn'
					},{	dataIndex: 'trtm_drtr_name'	, width:  80	, align : 'left'	, text: Language.get( 'trtm_drtr_name'	, '처리담당자')
					},{	dataIndex: 'trtm_date'		, width: 100	, align : 'center'	, text: Language.get( 'trtm_date'		, '처리일자')
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, flex  : 100  , align : 'center'
					},{ dataIndex: 'wkct_insp_dvcd'		, text : Language.get('wkct_insp_dvcd'		,''		), width : 50  , align : 'left', hidden : true
					},{ dataIndex: 'insp_sbsc_seqn'		, text : Language.get('insp_sbsc_seqn'		,''		), width : 50  , align : 'left', hidden : true
					}
				]
			}
		;
		return item;
	},
	insert : function () {
		var	store = this.up('grid').getStore(),
			tempa = this.up('grid'),
			selectItem = "",
			sItemLength,
			line_seqn,
			invc_numb,
			_set = 'insert',
			master = Ext.ComponentQuery.query('module-inspentry5-lister')[0],
			selectMaster = master.getSelectionModel().getSelection()[0].data;
		;
		console.log(tempa.getSelectionModel().selected.items.length);
		if(tempa.getSelectionModel().selected.items.length <= 0 ){
			Ext.Msg.alert("알림", '출고내역을 선택해주세요' );
			return;
		}else{
			selectItem = tempa.getSelectionModel().selected.items[0].data;
			Ext.Ajax.request({
				url		: _global.location.http() + '/qc/insp/inspentry5/get/search.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						spts_numb		: selectItem.invc_numb,
						spts_seqn		: selectItem.line_seqn
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						if(result.records.length >0){
							console.log(result.records[0]);
							selectItem = {
								line_seqn : result.records[0].spts_seqn,
								invc_numb : result.records[0].spts_numb,
								crte_dttm:result.records[0].crte_dttm,
								crte_ipad: result.records[0].crte_ipad,
								cstm_idcd: result.records[0].cstm_idcd,
								deli_date: Ext.Date.parse(result.records[0].deli_date,'Ymd'),
								find_name: result.records[0].find_name,
								insp_drtr_idcd: result.records[0].insp_drtr_idcd,
								item_idcd: result.records[0].item_idcd,
								line_clos: result.records[0].line_clos,
								line_levl: result.records[0].line_levl,
								line_ordr: result.records[0].line_ordr,
								line_stat: result.records[0].line_stat,
								pass_qntt: result.records[0].pass_qntt,
								remk_text: result.records[0].remk_text,
								spts_date: result.records[0].spts_date,
								spts_dept_idcd: result.records[0].spts_dept,
								spts_drtr_idcd: result.records[0].spts_drtr,
								spts_numb: selectMaster.invc_numb,
								trst_qntt: result.records[0].spts_qntt,
								unit_idcd: result.records[0].unit_idcd,
								updt_dttm: result.records[0].updt_dttm,
								updt_ipad: result.records[0].updt_ipad,
								wrhs_idcd: result.records[0].wrhs_idcd,
								wrhs_name: result.records[0].wrhs_name,
								item_name: result.records[0].item_name,
								cstm_name: result.records[0].cstm_name,
								user_name: result.records[0].user_name,
								poor_qntt: result.records[0].poor_qntt,
							};
							invc_numb = result.records[0].invc_numb;
							_set = 'update';
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(_set == 'insert'){
				Ext.Ajax.request({
					url		: _global.location.http() + '/listener/seq/maxid.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							table_nm		: 'ostt_insp'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							invc_numb = result.records[0].seq;
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}

			console.log(invc_numb);
			console.log(selectItem);
			console.log(selectMaster);

			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 80,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('spts_numb','출고의뢰번호'),
								name		: 'spts_numb',
								xtype		: 'textfield',
								value		: selectItem.invc_numb,
								width		: 250,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	name		: 'spts_seqn',
								xtype		: 'numericfield',
								margin		: '0 0 0 10',
								value		: selectItem.line_seqn,
								width		: 40,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('dept_name','출고의뢰부서'),
								name		: 'dept_name',
								xtype		: 'textfield',
//								value		: selectItem.acpt_numb,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'spts_dept_idcd', hidden:true,value : selectItem.spts_dept_idcd
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('drtr_name','출고의뢰담당자'),
								name		: 'user_name',
								xtype		: 'textfield',
								value		: selectMaster.dttr_name,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'spts_drtr_idcd', hidden:true,value : selectMaster.drtr_idcd
							},{	fieldLabel	: Language.get('item_name','품명'),
								name		: 'item_name',
								xtype		: 'textfield',
								value		: selectItem.item_name,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'item_idcd', hidden:true, value : selectItem.item_idcd
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('unit_name','단위명'),
								name		: 'unit_name',
								xtype		: 'textfield',
								value		: selectItem.unit_name,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'unit_idcd', hidden:true, value : selectItem.unit_idcd
							},{	fieldLabel	: Language.get('spts_date','출고의뢰일자'),
								xtype		: 'datefield',
								name		: 'spts_date',
								width		: 300,
//								value		: selectItem.ostt_date,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('spts_qntt','출고의뢰수량'),
								name		: 'spts_qntt',
								xtype		: 'numericfield',
								value		: selectItem.trst_qntt,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('wrhs_name','창고명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								pair		: 'wrhs_idcd',
								value		: selectItem.wrhs_name,
								width		: 300,
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								}
							},{ xtype:'textfield', name:'wrhs_idcd', hidden:true,value		: selectItem.wrhs_idcd
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								width		: 300,
								clearable	: true ,
								value		: selectItem.cstm_name,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{ xtype:'textfield', name:'cstm_idcd', hidden:true,value		: selectItem.cstm_idcd
							},{	fieldLabel	: Language.get('insp_drtr','검사담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name',
								pair		: 'insp_drtr_idcd',
								width		: 300,
								clearable	: true ,
								value		: selectItem.user_name,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{ xtype:'textfield', name:'insp_drtr_idcd', hidden:true,value	: selectItem.insp_drtr_idcd
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'datefield',
								name		: 'deli_date',
								width		: 300,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: selectItem.deli_date
							},{	fieldLabel	: Language.get('pass_qntt','합격수량'),
								name		: 'pass_qntt',
								xtype		: 'numericfield',
								width		: 300,
								value		: selectItem.pass_qntt
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
								items	: [
									{	fieldLabel	: Language.get('poor_qntt','불량수량'),
										name		: 'poor_qntt',
										xtype		: 'numericfield',
										width		: 300,
										value		: selectItem.poor_qntt
									},{	fieldLabel	: Language.get('lott_numb','lott번호'),
										name		: 'lott_numb',
										xtype		: 'textfield',
										width		: 300,
										value		: selectItem.lott_numb
									}
								]
							},{	fieldLabel	: Language.get('remk_text','비고'),
								name		: 'remk_text',
								xtype		: 'textarea',
								width		: 300,
								value		: selectItem.remk_text
							}
						]
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">저장</span>',
						cls: 'button-style',
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							var record = [{
								invc_numb		: invc_numb,
								spts_numb		: param.spts_numb,
								spts_seqn		: param.spts_seqn,
								spts_dept_idcd	: param.spts_dept_idcd	,
								spts_drtr_idcd	: param.spts_drtr_idcd	,
								item_idcd		: param.item_idcd		,
								unit_idcd		: param.unit_idcd		,
								spts_date		: param.spts_date		,
								spts_qntt		: param.spts_qntt		,
								wrhs_idcd		: param.wrhs_idcd		,
								cstm_idcd		: param.cstm_idcd		,
								insp_drtr_idcd	: param.insp_drtr_idcd	,
								deli_date		: param.deli_date		,
								pass_qntt		: param.pass_qntt		,
								poor_qntt		: param.poor_qntt		,
								lott_numb		: param.lott_numb		,
								remk_text		: param.remk_text		,
							}];
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry5/set/setOstt.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										records			: record,
										_set			: _set
									})
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										var a = Ext.ComponentQuery.query('[title=출고검사입력]')[0];
										console.log(a);
										a.down('form').getForm().reset();
										a.close();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						}
					},
					{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});

			win = Ext.widget('window', {
				title: '출고검사입력',
				closeAction: 'hide',
				width: 700,
				height: 300,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'insp_qntt'
			});
			win.show();
		}
	},
	deleteItem : function() {
		var	tempa = this.up('grid'),
			store = this.up('grid').getStore(),
			selectItem = tempa.getSelectionModel().selected.items[0].data,
			line_seqn = selectItem.line_seqn,
			invc_numb = selectItem.invc_numb,
			_set = 'delete'
		;
		Ext.Msg.confirm("알림","삭제하시겠습니까?",function(button){
			if(button=='yes'){
				record = Ext.create( store.model.modelName , {
					invc_numb: invc_numb,
					line_seqn: line_seqn,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						store.reload();
					} ,
					scope: this
				},{	synchro : _global.objects.synchro,_set : _set} );
			}
		});
	}
});