Ext.define('module.qc.insp.inspentry4.view.InspEntry4Master', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry4-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.qc.insp.inspentry4.store.InspEntry4Master',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
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
					{	text : '<span class="write-button">합격처리</span>', action : 'writeAction', cls: 'button1-style', itemId:'action1',
						hidden :( _global.hq_id.toUpperCase()!='N1000KOMEC' && _global.hq_id.toUpperCase()!='N1000SJUNG' && _global.hq_id.toUpperCase()!='N1000SJFLV') ? false : true },
					'-',
//					{	text : '<span class="write-button">검사보류</span>', action : 'passAction', cls: 'button1-style'	},
					'->', '-' ,
					{	text : '<span class="write-button">시험성적서 발행</span>'	, action : 'testReportAction'	, cls: 'button1-style', width: 100	},
					{	text : '<span class="write-button">제품표준서 발행</span>'	, action : 'prodStandardAction'	, cls: 'button1-style', width: 100	},
					{	text : '<span class="write-button">입고등록</span>'			, action : 'writeAction'		, cls: 'button1-style', width: 100	},
					'->','-',
					{	text : "<span>검사실적등록</span>", handler: me.insert ,iconCls: Const.INSERT.icon,itemId:'insert' } ,
					'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId:'master' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'judt_dvcd'			, text : Language.get('judt_dvcd'		,'검사판정'	)	, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd')     , align : 'center'
					},{	dataIndex: 'invc_numb'			, text : Language.get('invc_numb'		,'지시번호'	)	, width : 130, align : 'center'
					},{	dataIndex: 'pdod_date'			, text : Language.get('pdod_date'		,'지시일자'	)	, width :  90, align : 'center'
					},{	dataIndex: 'acpt_numb'			, text : Language.get('acpt_numb'		,'수주번호'	)	, width : 100, align : 'center'
					},{	dataIndex: 'acpt_seqn'			, text : Language.get('acpt_seqn'		,'수주항번'	)	, width :  70, align : 'center'
					},{	dataIndex: 'cstm_name'			, text : Language.get('cstm_name'		,'거래처명'	)	, width : 120,
					},{	dataIndex: 'item_name'			, text : Language.get('item_name'		,'품명'		)	, width : 180,
					},{	dataIndex: 'item_spec'			, text : Language.get('item_spec'		,'규격'		)	, width : 120,
					},{	dataIndex: 'wkct_name'			, text : Language.get('wkct_name'		,'공정명'	)	, width : 100,
					},{	dataIndex: 'pdsd_numb'			, text : Language.get('pdsd_numb'		,'생산계획번호'), width : 130, align : 'center'
					},{	dataIndex: 'pdsd_date'			, text : Language.get('pdsd_date'		,'계획일자'	)	, width : 100, align : 'center'
					},{	dataIndex: 'strt_dttm'			, text : Language.get('strt_dttm'		,'시작일시'	)	, width : 100, align : 'center'	, renderer: function (strt_dttm) {
						if (_global.options.mes_system_type.toUpperCase() === 'SJFLV' && strt_dttm != undefined) {
							return Ext.util.Format.substr(strt_dttm, 0,10);
						}
					}
					},{	dataIndex: 'endd_dttm'			, text : Language.get('endd_dttm'		,'종료일시')	, width : 100, align : 'center'	, renderer: function (endd_dttm) {
						if (_global.options.mes_system_type.toUpperCase() === 'SJFLV' && endd_dttm != undefined) {
							return Ext.util.Format.substr(endd_dttm, 0,10);
						}
					}
					},{	dataIndex: 'work_date'			, text : Language.get('work_date'		,'작업일자'	)	, width : 100, align : 'center'
					},{	dataIndex: 'work_item_name'		, text : Language.get('work_item_name'	,'작업품명'	)	, width : 180,
					},{	dataIndex: 'work_item_spec'		, text : Language.get('work_item_spec'	,'작업품목규격'), width : 120,
					},{	dataIndex: 'indn_qntt'			, text : Language.get('indn_qntt'		,'투입수량'	)	, width : 80,  align : 'center', xtype : 'numericcolumn',align : 'right', summaryType: 'sum'
					},{	dataIndex: 'work_strt_dttm'		, text : Language.get(''				,'작업시작일시'), width : 100, align : 'center', renderer: function (work_strt_dttm) {return Ext.util.Format.substr(work_strt_dttm,0,10);}
					},{	dataIndex: 'work_endd_dttm'		, text : Language.get(''				,'작업종료일시'), width : 100, align : 'center', renderer: function (work_endd_dttm) {return Ext.util.Format.substr(work_endd_dttm,0,10);}
					},{	dataIndex: 'last_insp_date'		, text : Language.get('last_insp_date'	,'검사일자'	)	, width : 100,
					},{ dataIndex: 'indn_qntt'			, text : Language.get('indn_qntt'		,'의뢰수량'	)	, width : 80 , align : 'center', xtype : 'numericcolumn',align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'			, text : Language.get('prod_qntt'		,'생산수량'	)	, width : 80 , align : 'center', xtype : 'numericcolumn',align : 'right', summaryType: 'sum'
					},{ dataIndex: 'insp_qntt'			, text : Language.get('insp_qntt'		,'검사수량'	)	, width : 70 , align : 'center', xtype : 'numericcolumn',align : 'right', summaryType: 'sum'
					},{ dataIndex: 'smor_poor_qntt'		, text : Language.get('smor_poor_qntt'	,'불량수량'	)	, width : 70 , align : 'center', xtype : 'numericcolumn',align : 'right', summaryType: 'sum'
					},{ dataIndex: 'smor_pass_qntt'		, text : Language.get('smor_pass_qntt'	,'합격수량'	)	, width : 70 , align : 'center', xtype : 'numericcolumn',align : 'right', summaryType: 'sum'
					},{ dataIndex: 'insp_mthd_dvcd'		, text : Language.get('insp_mthd_dvcd'	,'검사방법'	)	, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd'), align : 'center'
					},{	dataIndex: 'remk_text'			, text : Language.get('remk_text'		,'비고'		)	, width : 200
					}
				]
			}
		;
		return item;
	},
	insert : function () {
		if (_global.hq_id.toUpperCase()=='N1000SJUNG' || _global.hq_id.toUpperCase()=='N1000SJFLV') {
			this.up('grid').fireEvent('sjungInspection');
			return false;
		}
		var	store = this.up('grid').getStore(),
			tempa = this.up('grid'),
			selectItem = "",
			sItemLength,
			line_seqn,
			invc_numb,
			_set = 'insert',
			selectMaster = tempa.getSelectionModel().getSelection()[0];
		;

		if(tempa.getSelectionModel().selected.items.length < 1 ){
			Ext.Msg.alert("알림", '검사대기현황을 선택해주세요' );
			return;
		}
		else{
			selectItem = tempa.getSelectionModel().selected.items[0].data;
		}
			if(selectItem.last_invc_numb==null){
				Ext.Ajax.request({
					url		: _global.location.http() + '/listener/seq/maxid.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							table_nm		: 'last_insp'
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
			}else{
				invc_numb = selectItem.last_invc_numb;
			}
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
							{	fieldLabel	: Language.get('wkod_numb','지시의뢰번호'),
								name		: 'wkod_numb',
								xtype		: 'textfield',
								value		: selectItem.invc_numb,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								width		: 300,
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
							},{ xtype:'textfield', name:'cstm_idcd', hidden:true, value : selectItem.cstm_idcd
							},{ xtype:'textfield', name:'line_seqn', hidden:true, value : selectItem.line_seqn
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_name','품명'),
								name		: 'item_name',
								xtype		: 'textfield',
								value		: selectItem.item_name,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'item_idcd', hidden:true, value : selectItem.item_idcd
							},{	fieldLabel	: Language.get('item_spec','품목규격'),
								name		: 'item_spec',
								xtype		: 'textfield',
								width		: 300,
								readOnly	: true,
								value		: selectItem.item_spec,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'unit_idcd', hidden:true, value : selectItem.unit_idcd
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('spts_date','의뢰일자'),
								xtype		: 'datefield',
								name		: 'spts_date',
								width		: 300,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: selectMaster.data.invc_date,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'datefield',
								name		: 'deli_date',
								width		: 300,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: selectItem.deli_date,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('wrhs_name','입고창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								pair		: 'wrhs_idcd',
								value		: selectItem.wrhs_name,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
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
							},{	fieldLabel	: Language.get('insp_drtr','검사담당'),
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
							{	fieldLabel	: Language.get('indn_qntt','의뢰수량'),
								name		: 'indn_qntt',
								xtype		: 'numericfield',
								value		: selectItem.indn_qntt,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('insp_qntt','검사수량'),
								name		: 'insp_qntt',
								xtype		: 'numericfield',
								width		: 300,
								value		: selectItem.insp_qntt,
								listeners	: {
									blur: function() {
										var panel = this.up('form'),
											pass_qntt = panel.down('[name=smor_pass_qntt]').getValue(),//합격수량
											poor_qntt = panel.down('[name=smor_poor_qntt]').getValue(),//불량수량
											indn_qntt = panel.down('[name=indn_qntt]')     .getValue() //의뢰수량
											sum = pass_qntt + poor_qntt;
										;
										if(indn_qntt < this.getValue()){
											this.setValue(indn_qntt);
										}
										if(sum > this.getValue()){
											this.setValue(sum);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('smor_poor_qntt','불량수량'),
								name		: 'smor_poor_qntt',
								xtype		: 'numericfield',
								width		: 300,
								value		: selectItem.smor_poor_qntt,
								listeners	: {
									blur: function() {
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										;
										if(insp_qntt != null){
											var pass_qntt = panel.down('[name=smor_pass_qntt]').getValue();
											if(insp_qntt != null){
												var sum = Number(this.getValue())+Number(pass_qntt);
												if(sum > Number(insp_qntt)){
													this.setValue(insp_qntt-pass_qntt);
												}
											}else{
												this.setValue(0);
											}
										}
									}
								}
							},{	fieldLabel	: Language.get('smor_pass_qntt','합격수량'),
								name		: 'smor_pass_qntt',
								xtype		: 'numericfield',
								width		: 300,
								value		: selectItem.smor_pass_qntt,
								listeners	: {
									blur: function() {
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										if(insp_qntt != null){
											var poor_qntt = panel.down('[name=smor_poor_qntt]').getValue();
											if(insp_qntt != null){
												var sum = Number(this.getValue())+Number(poor_qntt);
												if(sum > Number(insp_qntt)){
													this.setValue(insp_qntt-poor_qntt);
												}
											}else{
												this.setValue(0);
											}
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,
								items	: [
									{	fieldLabel	: Language.get('insp_mthd_dvcd','검사방법'),			//temp
										xtype		: 'lookupfield',
										name		: 'insp_mthd_dvcd',
										lookupValue	: resource.lookup('insp_mthd_dvcd'),
										width		: 300,
										value		: selectItem.insp_mthd_dvcd
									},{	fieldLabel	: Language.get('judt_dvcd','검사판정'),			//temp
										xtype		: 'lookupfield',
										name		: 'judt_dvcd',
										lookupValue	: resource.lookup('judt_dvcd'),
										width		: 300,
										value		: selectItem.judt_dvcd
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

							var check = 0;
							var record = [{
								invc_numb : invc_numb,
								line_seqn : param.line_seqn,
								cstm_idcd : param.cstm_idcd,
								cstm_name : param.cstm_name,
								item_idcd : param.item_idcd,
								item_name : param.item_name,
								wkod_numb : param.wkod_numb,
								item_spec : param.item_spec,
								spts_date : param.spts_date,
								deli_date : param.deli_date,
								wrhs_name : param.wrhs_name,
								wkod_numb : param.wkod_numb,
								user_name : param.user_name,
								indn_qntt : param.indn_qntt,
								insp_qntt : param.insp_qntt,
								smor_poor_qntt : param.smor_poor_qntt,
								smor_pass_qntt : param.smor_pass_qntt,
								insp_mthd_dvcd : param.insp_mthd_dvcd,
								judt_dvcd : param.judt_dvcd,
								remk_text : param.remk_text,

							}];
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry4/set/setOstt.do',
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
										check=1;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									store.reload();
								}
							});
							if(check){
								this.up('form').getForm().reset();
								this.up('window').hide();
							}
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
				height: 340,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'insp_qntt'
			});
			win.show();
		},
});