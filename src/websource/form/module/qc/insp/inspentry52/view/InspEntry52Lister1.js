Ext.define('module.qc.insp.inspentry52.view.InspEntry52Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry52-lister1',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.qc.insp.inspentry52.store.InspEntry52Lister1',
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
					{	text : "<span>검사결과입력</span>", action : 'typeItem' , iconCls: Const.INSERT.icon } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', itemId:'lister1'} , '-' ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'			, text : Language.get('invc_numb'		,'INVOICE번호')	, width : 60  , align : 'center' , hidden : true
					},{ dataIndex: 'line_seqn'			, text : Language.get('line_seqn'		,'항번')			, width : 60  , align : 'center'
					},{ dataIndex: 'acpt_numb'			, text : Language.get('acpt_numb'		,'수주번호')		, width : 120 , align : 'center'
					},{ dataIndex: 'acpt_seqn'			, text : Language.get('acpt_seqn'		,'수주항번')		, width : 80  , align : 'center'
					},{ dataIndex: 'item_name'			, text : Language.get('item_name'		,'품명')			, width : 160
					},{ dataIndex: 'item_spec'			, text : Language.get('item_spec'		,'규격')			, width : 160
					},{ dataIndex: 'item_idcd'			, text : Language.get('item_idcd'		,'품목ID')		, width : 120 , hidden: true
					},{ dataIndex: 'sale_unit'			, text : Language.get('sale_unit'		,'단위')			, width : 80  , align : 'center'
					},{ dataIndex: 'unit_idcd'			, text : Language.get('unit_idcd'		,'단위')			, width : 80  , hidden: true
					},{ dataIndex: 'norm_sale_pric'		, text : Language.get('norm_sale_pric'	,'정상판매단가')		, width : 90  , xtype : 'numericcolumn'	, hidden : true
					},{ dataIndex: 'sale_stnd_pric'		, text : Language.get('sale_stnd_pric'	,'판매기준단가')		, width : 90  , xtype : 'numericcolumn'	, hidden : true
					},{ dataIndex: 'sale_pric'			, text : Language.get('sale_pric'		,'판매단가')		, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'trst_qntt'			, text : Language.get('trst_qntt'		,'의뢰수량')		, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'vatx_incl_yorn'		, text : Language.get('vatx_incl_yorn'	,'부가세포함')		, width : 90  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')	, hidden : true
					},{ dataIndex: 'vatx_rate'			, text : Language.get('vatx_rate'		,'부가세율')		, width : 80  , xtype : 'numericcolumn'	, hidden : true
					},{ dataIndex: 'sale_amnt'			, text : Language.get('sale_amnt'		,'판매금액')		, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'vatx_amnt'			, text : Language.get('vatx_amnt'		,'부가세')			, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'ttsm_amnt'			, text : Language.get('ttsm_amnt'		,'합계금액')		, width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'deli_date'			, text : Language.get('deli_date'		,'납기일자')		, width : 100 , align : 'center' , hidden : (_global.hqof_idcd=='N1000dehan')
					},{ dataIndex: 'stnd_unit'			, text : Language.get('stnd_unit'		,'기준단위')		, width : 80  , align : 'center'	, hidden : true
					},{ dataIndex: 'stnd_unit_qntt'		, text : Language.get('stnd_unit_qntt'	,'기준단위수량')		, width : 90  , xtype : 'numericcolumn'	, hidden : true
					},{ dataIndex: 'wrhs_idcd'			, text : Language.get('wrhs_idcd'		,'창고ID')		, width : 100 , align : 'center', hidden:true
					},{ dataIndex: 'dlvy_cstm_idcd'		, text : Language.get('dlvy_cstm_idcd'	,'납품거래처ID')	, width : 100 , align : 'center', hidden:true
					},{ dataIndex: 'dsct_yorn'			, text : Language.get('dsct_yorn'		,'중단여부')		, width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')	, hidden : true
					},{ dataIndex: 'ostt_dvcd'			, text : Language.get('ostt_dvcd'		,'출고구분')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('ostt_dvcd')	, hidden : true
					},{ dataIndex: 'insp_dvcd'			, text : Language.get('insp_dvcd'		,'검사구분')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_dvcd')
					},{ dataIndex: 'insp_date'			, text : Language.get('insp_date'		,'검사일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'insp_mthd_dvcd'		, text : Language.get('insp_mthd_dvcd'	,'검사방법')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')
					},{ dataIndex: 'insp_qntt'			, text : Language.get('insp_qntt'		,'검사수량')		, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'pass_qntt'			, text : Language.get('pass_qntt'		,'합격수량')		, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'poor_qntt'			, text : Language.get('poor_qntt'		,'불량수량')		, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'judt_dvcd'			, text : Language.get('judt_dvcd'		,'판정구분')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd')
					},{ dataIndex: 'pcod_numb'			, text : Language.get('pcod_numb'		,'PONO')		, width : 100 , align : 'center'
					},{ dataIndex: 'ostt_yorn'			, text : Language.get('ostt_yorn'		,'출고여부')		, width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'ostt_date'			, text : Language.get('ostt_date'		,'출고일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'ostt_qntt'			, text : Language.get('ostt_qntt'		,'출고수량')		, width : 80  , xtype : 'numericcolumn'
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
			master = Ext.ComponentQuery.query('module-inspentry52-lister')[0],
			selectMaster = master.getSelectionModel().getSelection()[0];
		;
		if(tempa.getSelectionModel().selected.items.length <= 0 ){
			Ext.Msg.alert("알림", '출고내역을 선택해주세요' );
			return;
		}else{
			selectItem = tempa.getSelectionModel().selected.items[0].data;
			Ext.Ajax.request({
				url		: _global.location.http() + '/qc/insp/inspentry52/get/search.do',
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
								spts_numb: selectMaster.data.invc_numb,
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
								insp_mthd_dvcd :result.records[0].insp_mthd_dvcd,
								insp_qntt : result.records[0].insp_qntt,
								judt_dvcd :result.records[0].judt_dvcd
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
							},{ xtype:'textfield', name:'cstm_idcd', hidden:true,value		: selectItem.cstm_idcd

							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('dept_name','출고의뢰부서'),
								name		: 'dept_name',
								xtype		: 'textfield',
		//						value		: selectItem.acpt_numb,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'spts_dept_idcd', hidden:true,value : selectItem.spts_dept_idcd
							},{	fieldLabel	: Language.get('drtr_name','출고의뢰담당'),
								name		: 'user_name',
								xtype		: 'textfield',
								value		: selectMaster.data.dttr_name,
								width		: 300,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{ xtype:'textfield', name:'spts_drtr_idcd', hidden:true,value : selectMaster.data.drtr_idcd
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
							},{	fieldLabel	: Language.get('item_spec','규격'),
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
							{	fieldLabel	: Language.get('wrhs_name','출고창고'),
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
							{	fieldLabel	: Language.get('spts_qntt','의뢰수량'),
								name		: 'spts_qntt',
								xtype		: 'numericfield',
								value		: selectItem.trst_qntt,
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
											pass_qntt = panel.down('[name=pass_qntt]').getValue(),
											poor_qntt = panel.down('[name=poor_qntt]').getValue(),
											spts_qntt = panel.down('[name=spts_qntt]').getValue()
											sum = pass_qntt + poor_qntt;
										;
										if(spts_qntt < this.getValue()){
											this.setValue(spts_qntt);
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
							{	fieldLabel	: Language.get('poor_qntt','불량수량'),
								name		: 'poor_qntt',
								xtype		: 'numericfield',
								width		: 300,
								value		: selectItem.poor_qntt,
								listeners	: {
									blur: function() {
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue(),
											judt_dvcd = panel.down('[name=judt_dvcd]')
										;
										if(insp_qntt != null){
											var pass_qntt = panel.down('[name=pass_qntt]').getValue();
											if(insp_qntt != null){
												var sum = Number(this.getValue())+Number(pass_qntt);
												if(sum > Number(insp_qntt)){
													this.setValue(insp_qntt-pass_qntt);
												}
											}else{
												this.setValue(0);
											}
											if(this.getValue()>0){
												judt_dvcd.setValue("2");
											}else if(this.getValue()<=0){
												judt_dvcd.setValue("1");
											}
										}
									}
								}
							},{	fieldLabel	: Language.get('pass_qntt','합격수량'),
								name		: 'pass_qntt',
								xtype		: 'numericfield',
								width		: 300,
								value		: selectItem.pass_qntt,
								listeners	: {
									blur: function() {
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										if(insp_qntt != null){
											var poor_qntt = panel.down('[name=poor_qntt]').getValue();
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
									},{	fieldLabel	: Language.get('lott_numb','lot번호'),
										name		: 'lott_numb',
										xtype		: 'textfield',
										width		: 300,
										value		: selectItem.lott_numb
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
								insp_mthd_dvcd	: param.insp_mthd_dvcd	,
								insp_qntt		: param.insp_qntt		,
								judt_dvcd		: param.judt_dvcd		,
							}];
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry52/set/setOstt.do',
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
				height: 350,
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