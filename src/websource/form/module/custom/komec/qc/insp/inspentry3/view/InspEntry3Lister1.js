Ext.define('module.custom.komec.qc.insp.inspentry3.view.InspEntry3Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-inspentry3-lister1',
	store		: 'module.custom.komec.qc.insp.inspentry3.store.InspEntry3Lister1',
	border		: 0,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					'->', '-' ,
					{	text : "<span>입고검사</span>", action : 'typeItem' , iconCls: Const.INSERT.icon } ,
//					{	text : "<span>검사실적등록</span>", handler: me.insert ,iconCls: Const.INSERT.icon,itemId:'insert' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'} , '-' ,
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
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		)	, width : 80  , align : 'center', hidden : true
					},{	dataIndex: 'invc_date'		, text : Language.get('insp_date'		,'검사일자'		)	, width : 80  , align : 'center'
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드'		)	, width : 120 , align : 'center', hidden : true
					},{ dataIndex: 'invc_numb'		, text : Language.get(''				,'invc_numb')	, width : 120 , align : 'center', hidden : true
					},{ dataIndex: 'insp_sbsc_name'	, text : Language.get('insp_sbsc_name'	,'검사항목'		)	, width : 150
					},{ dataIndex: 'insp_cond'		, text : Language.get('insp_cond'		,'검사조건'		)	, width : 200
					},{ dataIndex: 'insp_mthd_dvcd'	, text : Language.get('insp_mthd_dvcd'	,'검사방법'		)	, width : 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'검사장비'		)	, width : 120 , align : 'center'
					},{ dataIndex: 'msmt_valu'		, text : Language.get('msmt_valu'		,'측정값'		)	, width : 80
						, renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '유해물질'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == 'Appearance'){
								if(value == '1'){
									value = 'Clear Liquid';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							return value;
						},
					},{ dataIndex: 'msmt_valu2'		, text : Language.get('msmt_valu2'		,'측정값2'		)	, width : 80  , hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
							renderer: function(value, meta){
								var unit = meta.record.get('insp_sbsc_name');
								var lineSeqn = meta.record.get('line_seqn');
								if(unit == '외관'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == '유해물질'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == 'Appearance'){
									if(value == '1'){
										value = 'Clear Liquid';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								return value;
							},
					},{ dataIndex: 'msmt_valu3'		, text : Language.get('msmt_valu3'		,'측정값3'		)	, width : 80  , hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
							renderer: function(value, meta){
								var unit = meta.record.get('insp_sbsc_name');
								var lineSeqn = meta.record.get('line_seqn');
								if(unit == '외관'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == '유해물질'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == 'Appearance'){
									if(value == '1'){
										value = 'Clear Liquid';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								return value;
							},
					},{ dataIndex: 'msmt_valu4'		, text : Language.get('msmt_valu4'		,'측정값4'		)	, width : 80  , hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
							renderer: function(value, meta){
								var unit = meta.record.get('insp_sbsc_name');
								var lineSeqn = meta.record.get('line_seqn');
								if(unit == '외관'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == '유해물질'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == 'Appearance'){
									if(value == '1'){
										value = 'Clear Liquid';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								return value;
							},
					},{ dataIndex: 'msmt_valu5'		, text : Language.get('msmt_valu5'		,'측정값5'		)	, width : 80  , hidden : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
							renderer: function(value, meta){
								var unit = meta.record.get('insp_sbsc_name');
								var lineSeqn = meta.record.get('line_seqn');
								if(unit == '외관'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == '유해물질'){
									if(value == '1'){
										value = 'OK';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								if(unit == 'Appearance'){
									if(value == '1'){
										value = 'Clear Liquid';
									}else if(value == '0'){
										value = 'FAIL';
									}
								}
								return value;
							},
					},{ dataIndex: 'insp_qntt'		, text : Language.get('insp_qntt'		,'검사수량'		)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'pass_qntt'		, text : Language.get('pass_qntt'		,'합격수량'		)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'		)	, width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'judt_dvcd'		, text : Language.get('judt_dvcd'		,'판정'		)	, width : 120 , align : 'center',xtype: 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd')
					},{ dataIndex: 'insp_cvic_idcd'	, text : Language.get('insp_cvic_idcd'	,'검사설비id'	)	, width : 120 , align : 'center',hidden:true
					}
				]
			}
		;
		return item;
	},
	insert : function () {
		var	store = this.up('grid').getStore(),
			milestone = this.itemId,
			tempa = this.up('grid'),

			selectItem , sItemLength, wkod_numb, new_invc_numb, _set, insp_cvic_idcd,wkct_idcd,
			line_seqn,item_idcd,insp_cond,goal_levl,uppr_valu,lwlt_valu, cvic_name , wkct_name,
			wkct_insp_dvcd  , insp_mthd_dvcd

			master = Ext.ComponentQuery.query('module-komec-inspentry3-lister')[0],
			selectMaster = master.getSelectionModel().getSelection()[0]
		;
		if(!selectMaster){
			Ext.Msg.alert("알림", '생산지시서를 선택해주세요' );
			return;
		}else{
			item_idcd = selectMaster.data.item_idcd;
			wkod_numb = selectMaster.data.invc_numb;
			if(tempa.getSelectionModel().selected.items.length > 0){
				selectItem     = tempa.getSelectionModel().selected.items[0].data;
				line_seqn      = selectItem.line_seqn;
				new_invc_numb  = selectItem.invc_numb;
				insp_cvic_idcd = selectItem.insp_cvic_idcd;
				insp_mthd_dvcd = selectItem.insp_mthd_dvcd;
				cvic_name      = selectItem.cvic_name;
				wkct_name      = selectItem.wkct_name;
				wkct_idcd      = selectItem.wkct_idcd;
				wkct_insp_dvcd = selectItem.wkct_insp_dvcd;
				_set = 'update';
			}else{
				_set = 'insert';
				if(tempa.getStore().data.length >0){
					sItemLength = tempa.getStore().data.length-1;
				}else{
				}
				Ext.Ajax.request({
					url		: _global.location.http() + '/qc/insp/inspentry3/get/wkct_insp_seqn.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd,
							wkod_numb	: wkod_numb,
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
							if(result.records.length>0){
								line_seqn = result.records[0].seqn;
							}else{
							}
						}
					},
					failure : function(result, request) {
						Ext.Msg.error(result.mesage);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
				selectItem	= '[]';
			}
			if(line_seqn){
				Ext.Ajax.request({
					url		: _global.location.http() + '/qc/insp/inspentry3/get/insp_cond.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd,
							item_idcd	: item_idcd,
							line_seqn	: line_seqn
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
							if(result.records.length>0){
								insp_cond = result.records[0].insp_cond;
								goal_levl = result.records[0].goal_levl;
								uppr_valu = result.records[0].uppr_valu;
								lwlt_valu = result.records[0].lwlt_valu;
								insp_cvic_idcd = result.records[0].insp_cvic_idcd;
								insp_mthd_dvcd = result.records[0].insp_mthd_dvcd;
								cvic_name      = result.records[0].cvic_name;
								wkct_name      = result.records[0].wkct_name;
								wkct_idcd      = result.records[0].wkct_idcd;
								wkct_insp_dvcd = result.records[0].wkct_insp_dvcd;
							}else{
							}
						}
					},
					failure : function(result, request) {
						Ext.Msg.error(result.mesage);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			if(insp_cond==null || insp_cond == ''){
				Ext.Msg.alert('알림','더 이상 검사항목이 없습니다.')
				return;
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 60,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('wkod_numb','지시번호'),
						name		: 'wkod_numb',
						xtype		: 'textfield',
						value		: selectMaster.data.invc_numb,
						width		: 400,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	fieldLabel	: Language.get('cstm_name','거래처'),
						name		: 'cstm_name',
						xtype		: 'textfield',
						value		: selectMaster.data.cstm_name,
						width		: 400,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	fieldLabel	: Language.get('item_name','품명'),
						name		: 'item_name',
						xtype		: 'textfield',
						value		: selectMaster.data.item_name,
						width		: 400,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	fieldLabel	: Language.get('item_spec','규격'),
						name		: 'item_spec',
						xtype		: 'textfield',
						value		: selectMaster.data.item_spec,
						width		: 400,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('indn_qntt','지시수량'),
								name		: 'indn_qntt',
								xtype		: 'numericfield',
								width		: 150,
								value		: selectMaster.data.indn_qntt,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('pdod_date','지시일자'),
								name		: 'pdod_date',
								xtype		: 'textfield',
								labelWidth	: 160,
								value		: selectMaster.data.pdod_date,
								width		: 250,
								fieldStyle	: 'text-align:center;',
								readOnly	: true,
								fieldCls	: 'readonlyfield'
							}
						]
					},{	fieldLabel	: Language.get('wkct_idcd','검사공정'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						width		: 400,
						clearable	: false ,
						value		: wkct_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkct-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	fieldLabel	: Language.get('cvic_name','검사장비'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'insp_cvic_idcd',
						width		: 400,
						clearable	: false ,
						value		: cvic_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-cvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',cvic_kind_dvcd:'4000' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'insp_cvic_idcd', xtype : 'textfield' , hidden : true, value: insp_cvic_idcd
					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true, value: wkct_idcd
					},{	name : 'item_idcd', xtype : 'textfield' , hidden : true, value: selectMaster.data.item_idcd
					},{	fieldLabel	: Language.get('smli_dvcd','검사구분'),			//temp
						xtype		: 'lookupfield',
						name		: 'smli_dvcd',
						lookupValue	: resource.lookup('smli_dvcd'),
						width		: 400,
						value		: selectItem.smli_dvcd
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cnfm_drtr_idcd','검사담당'),			//temp
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name',
								pair		: 'cnfm_drtr_idcd',
								clearable	: false ,
								width		: 190,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								value		: _global.login_nm ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	fieldLabel	: Language.get('wkct_insp_dvcd','공정검사구분'),
								name		: 'wkct_insp_dvcd',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('wkct_insp_dvcd'),
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 210,
								labelWidth	: 80,
								value		: selectItem.wkct_insp_dvcd
							}
						]
					},{	name : 'cnfm_drtr_idcd', xtype : 'textfield' , hidden : true,value : _global.login_id
					},{	fieldLabel	: Language.get('insp_mthd_dvcd','검사방법'),			//temp
						xtype		: 'lookupfield',
						name		: 'insp_mthd_dvcd',
						width		: 400,
						lookupValue	: resource.lookup('insp_mthd_dvcd'),
						value		: selectItem.insp_mthd_dvcd,
						readOnly	: false,
						listeners	:{
							render:function(){
								if(this.getValue()==''||this.getValue()==null){
									this.setValue('2000');
								}
							}
						}
					},{	fieldLabel	: Language.get('base_name','검사항목'),			//temp
						width		: 400,
						value		: selectMaster.data.base_name,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'base_name',
						pair		: 'insp_sbsc_dvcd',
						value		: selectItem.base_name,
						allowBlank	: false,
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-base-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',prnt_idcd:'4100' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						},
						enableKeyEvents: true ,
						listeners	: {
							keydown : function(self, e) {
								/* 엔터키 이벤트를 호출한다. */
								var panel		= this.up('form'),
									insp_qntt	= panel.down('[name=insp_qntt]')
								;
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
									insp_qntt.focus(true , 10)
								}
							}
						},
					},{	name : 'insp_sbsc_dvcd', xtype : 'textfield' , hidden : true,value : selectItem.insp_sbsc_dvcd,
					},{	fieldLabel	: Language.get('insp_cond','검사조건'),
						xtype		: 'textarea',
						width		: 400,
						height		: 100,
						name		: 'insp_cond',
						value		: insp_cond,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('goal_levl','목표치'),
								name		: 'goal_levl',
								xtype		: 'numericfield',
								width		: 140,
								readOnly	: true,
								value		: goal_levl,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('uppr_valu','(상한)'),
								name		: 'uppr_valu',
								xtype		: 'numericfield',
								labelWidth	: 50,
								value		: uppr_valu,
								margin		: 0,
								width		: 130,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	: Language.get('lwlt_valu','(하한)'),
								name		: 'lwlt_valu',
								xtype		: 'numericfield',
								labelWidth	: 50,
								value		: lwlt_valu,
								margin		: 0,
								width		: 130,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('insp_qntt','검사수량'),
								name		: 'insp_qntt',
								xtype		: 'numericfield',
								value		: selectItem.insp_qntt,
								width		: 150,
								listeners	: {
									change : function(){
										var panel = this.up('form'),
											good_qntt = panel.down('[name=good_qntt]').getValue(),
											poor_qntt = panel.down('[name=poor_qntt]').getValue(),
											indn_qntt = panel.down('[name=indn_qntt]').getValue()
										;
										if(this.getValue() > indn_qntt){
											this.setValue(indn_qntt);
										}else{
											if(this.getValue()=='' || this.getValue()==null){
												panel.down('[name=good_temp]').setValue('0%');
												panel.down('[name=poor_temp]').setValue('0%');
											}else{
												if(good_qntt != null){
													var avgg = (good_qntt/this.getValue())*100;
													avgg = Ext.util.Format.number(avgg,'0,000.00');
													panel.down('[name=good_temp]').setValue(avgg+'%');
												}
												if(poor_qntt != null){
													var avgp = (poor_qntt/this.getValue())*100;
													avgp = Ext.util.Format.number(avgp,'0,000.00');
													panel.down('[name=poor_temp]').setValue(avgp+'%');
												}
											}
										}
									},
									blur: function() {
										var panel = this.up('form'),
											good_qntt = panel.down('[name=good_qntt]').getValue(),
											poor_qntt = panel.down('[name=poor_qntt]').getValue()
											sum = good_qntt + poor_qntt;
										;
										if(sum > this.getValue()){
											panel.down('[name=good_qntt]').setValue(0);
											panel.down('[name=poor_qntt]').setValue(0);
										}
									}
								}
							},{	fieldLabel	: Language.get('insp_date','검사일시'),
								name		: 'insp_date',
								xtype		: 'datefield',
								labelWidth	: 80,
								margin		: 0,
								value		: selectItem.insp_date,
								width		: 180,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								listeners	: {
									render:function(val){
										var value = val.getValue();
										if(!value){
											this.setValue(new Date());
										}
									}
								}
							},{	name		: 'insp_strt_time',
								xtype		: 'timefield',
								labelWidth	: 50,
								margin		: 0,
								value		: selectItem.insp_strt_time,
								width		: 70,
								format		: 'H:i',
								increment	: 30,
								anchor		: '100%',
								listeners	: {
									render:function(val){
										var value = val.getValue();
										console.log(value);
										if(!value){
											this.setValue(new Date());
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('good_qntt','양품수량'),
								name		: 'good_qntt',
								xtype		: 'numericfield',
								labelStyle	: 'color:blue;text-align:right',
								width		: 150,
								value		: selectItem.good_qntt,
								enableKeyEvents: true ,
								listeners	: {
									beforerender: function() {
									var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										if(insp_qntt != null){
											var avgp = (this.getValue()/insp_qntt)*100;
											if(isNaN(avgp)){
											}else{
												avgp = Ext.util.Format.number(avgp,'0,000.00');
												panel.down('[name=good_temp]').setValue(avgp+'%');
											}
										}
									},
									change : function(){
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue();
										var poor_qntt = panel.down('[name=poor_qntt]').getValue();
										if(insp_qntt != null){
											var sum = Number(this.getValue())+Number(poor_qntt);
											if(sum <= Number(insp_qntt)){
												var avgp = (this.getValue()/insp_qntt)*100;
												avgp = Ext.util.Format.number(avgp,'0,000.00');
												panel.down('[name=good_temp]').setValue(avgp+'%');
											}else{
											}
										}else{
											this.setValue(0);
										}
									},
									blur:function(){
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue();
										var poor_qntt = panel.down('[name=poor_qntt]').getValue();
										var sum = Number(insp_qntt -this.getValue()-poor_qntt);
										if(sum >= 0){
											panel.down('[name=poor_qntt]').setValue(insp_qntt-this.getValue());
										}else{
											this.setValue(0);
											panel.down('[name=poor_qntt]').setValue(0);
										}
									},
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											poor_qntt	= panel.down('[name=poor_qntt]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											poor_qntt.focus(true , 10)
										}
									}
								}
							},{	xtype		: 'field',
								readOnly	: 'readonly',
								name		: 'good_temp',
								fieldCls	: 'readonlyfield',
								width		: 50,
								fieldStyle	: 'border:0;color:blue;text-align:center;font-weight:bold',
								value		: '0%',
							},{	fieldLabel	: Language.get('poor_qntt','불량수량'),
								name		: 'poor_qntt',
								labelStyle	: 'color:red; text-align:right',
								xtype		: 'numericfield',
								margin		: 0,
								value		: selectItem.poor_qntt,
								width		: 150,
								enableKeyEvents: true ,
								listeners	: {
									beforerender: function() {
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										if(insp_qntt != null){
											var avgp = (this.getValue()/insp_qntt)*100;
											if(isNaN(avgp)){
											}else{
												avgp = Ext.util.Format.number(avgp,'0,000.00');
												panel.down('[name=poor_temp]').setValue(avgp+'%');
											}
										}
									},
									change : function(){
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue();
										var good_qntt = panel.down('[name=good_qntt]').getValue();

										this.up('form').checkValue();
										if(insp_qntt != null){
											var sum = Number(this.getValue())+Number(good_qntt);
											if(sum <= Number(insp_qntt)){
												if(insp_qntt-this.getValue()>=0){
													var avgp = (this.getValue()/insp_qntt)*100;
													avgp = Ext.util.Format.number(avgp,'0,000.00');
													panel.down('[name=poor_temp]').setValue(avgp+'%');
												}else{
												}
											}else{
											}
										}else{
											this.setValue(0);
										}
									},
									blur:function(){
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue();
										var good_qntt = panel.down('[name=good_qntt]').getValue();
										if(insp_qntt-good_qntt-this.getValue() < 0){
											panel.down('[name=good_qntt]').setValue(0);
											this.setValue(0);
										}else{
											panel.down('[name=good_qntt]').setValue(insp_qntt-this.getValue());
										}
									},
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											msmt_valu_1fst	= panel.down('[name=msmt_valu_1fst]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											msmt_valu_1fst.focus(true , 10)
										}
									}
								}
							},
							{	xtype		: 'field',
								readOnly	: 'readonly',
								name		: 'poor_temp',
								fieldCls	: 'readonlyfield',
								width		: 50,
								fieldStyle	: 'border:0;color:red;text-align:center;font-weight:bold',
								value		: '0%',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', margin:'5 0 0 0', border: 0,
						items	: [
							{	fieldLabel	: Language.get('msmt_valu_1fst','측정값'),
								xtype		: 'numericfield',
								name		: 'msmt_valu_1fst',
								margin		: '0 0 0 0',
								width		: 123,
//								value		: selectItem.msmt_valu_1fst,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_2snd',
								margin		: '0 0 0 11',
								width		: 58,
//								value		: selectItem.msmt_valu_2snd,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_3trd',
								margin		: '0 0 0 12',
								width		: 58,
//								value		: selectItem.msmt_valu_3trd,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_4frt',
								margin		: '0 0 5 11',
								width		: 58,
//								value		: selectItem.msmt_valu_4frt,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_5fit',
								margin		: '0 0 5 11',
								width		: 58,
//								value		: selectItem.msmt_valu_5fit,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', margin:'1 0 0 0', border: 0,
						items	: [
							{	fieldLabel	: Language.get('',' '),
								xtype		: 'numericfield',
								name		: 'msmt_valu_6six',
								margin		: '0 0 0 0',
								width		: 123,
//								value		: selectItem.msmt_valu_6six,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_7svn',
								margin		: '0 0 0 11',
								width		: 58,
//								value		: selectItem.msmt_valu_7svn,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_8egh',
								margin		: '0 0 0 12',
								width		: 58,
//								value		: selectItem.msmt_valu_8egh,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_9nin',
								margin		: '0 0 5 11',
								width		: 58,
//								value		: selectItem.msmt_valu_9nin,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},{	xtype		: 'numericfield',
								name		: 'msmt_valu_10',
								margin		: '0 0 5 11',
								width		: 58,
//								value		: selectItem.msmt_valu_10,
								listeners	: {
									change:function(val){
										this.up('form').checkValue();
									}
								}
							},
						],
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('poor_type_name','불량유형'),			//temp
								width		: 192,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'poor_type_name',
								pair		: 'poor_type_bacd',
								allowBlank	: false,
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',prnt_idcd:'6000' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											insp_qntt	= panel.down('[name=poor_caus_name]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											insp_qntt.focus(true , 10)
										}
									}
								},
							},{	name : 'poor_type_bacd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('poor_caus_name','불량원인'),			//temp
								width		: 208,
								labelWidth	: 76,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'poor_caus_name',
								pair		: 'poor_caus_bacd',
								allowBlank	: false,
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',prnt_idcd:'6001' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										var panel		= this.up('form'),
											insp_qntt	= panel.down('[name=judt_dvcd]')
										;
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
											insp_qntt.focus(true , 10)
										}
									}
								},
							},{	name : 'poor_caus_bacd', xtype : 'textfield' , hidden : true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
						{	fieldLabel	: Language.get('judt_dvcd','판정'),
							xtype		: 'lookupfield',
							name		: 'judt_dvcd',
							lookupValue	: resource.lookup('judt_dvcd'),
							value		: selectItem.judt_dvcd,
							width		: 150,
						},{	fieldLabel	: Language.get('lott_numb','LOT 번호'),
							name		: 'lott_numb',
							xtype		: 'textfield',
							width		: 250,
							labelWidth	: 118,
							value		: selectItem.lott_numb,
						}
					]
				}
			],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">저장</span>',
						cls: 'button-style',
						handler: function() {
							var a = Ext.merge( this.up('form').getValues());
							if(a.wkct_insp_dvcd==null||a.wkct_insp_dvcd==''){
								Ext.Msg.alert("알림","공정검사구분을 반드시 입력해주십시오.");
							}else{
								if(_set == "insert"){
									Ext.Ajax.request({
										url			: _global.location.http() + '/qc/insp/inspentry3/get/wkct_invc_numb.do',
										params		: {
											token	: _global.token_id ,
											param	: JSON.stringify({
												stor_id		: _global.stor_id,
												hqof_idcd	: _global.hqof_idcd,
												wkod_numb	: wkod_numb,
											})
										},
										async	: false,
										method	: 'POST',
										success	: function(response, request) {
											var result = Ext.decode(response.responseText);
											if(result.records[0]){
												new_invc_numb=result.records[0].invc_numb;
											}
										}
									});
									if(new_invc_numb){
									}else{
									Ext.Ajax.request({
										url			: _global.location.http() + '/listener/seq/maxid.do',
										params		: {
											token	: _global.token_id ,
											param	: JSON.stringify({
												stor_id	: _global.stor_id,
												table_nm: 'wkct_insp'
											})
										},
										async	: false,
										method	: 'POST',
										success	: function(response, request) {
											var result = Ext.decode(response.responseText);
											new_invc_numb=result.records[0].seq;
										}
									});
									}
								}
								var param = Ext.merge( this.up('form').getValues());
								record = Ext.create( store.model.modelName , {
									invc_numb		: new_invc_numb,
									line_seqn		: line_seqn,
									insp_date		: param.insp_date,
									smli_dvcd		: param.smli_dvcd,
									cnfm_drtr_idcd	: param.cnfm_drtr_idcd,
									user_name		: param.user_name,
									insp_mthd_dvcd	: param.insp_mthd_dvcd,
									insp_cvic_idcd	: param.insp_cvic_idcd,
									judt_dvcd		: param.judt_dvcd,
									poor_caus_bacd	: param.poor_caus_bacd,
									poor_type_dvcd	: param.poor_type_dvcd,
									msmt_valu		: param.msmt_valu,
									indn_qntt		: param.indn_qntt,
									good_qntt		: param.good_qntt,
									poor_qntt		: param.poor_qntt,
									insp_qntt		: param.insp_qntt,
									insp_strt_time	: param.insp_strt_time,
									wkct_idcd		: param.wkct_idcd,
									msmt_valu_1fst	: param.msmt_valu_1fst,
									msmt_valu_2snd	: param.msmt_valu_2snd,
									msmt_valu_3trd	: param.msmt_valu_3trd,
									msmt_valu_4frt	: param.msmt_valu_4frt,
									msmt_valu_5fit	: param.msmt_valu_5fit,
									msmt_valu_6six	: param.msmt_valu_6six,
									msmt_valu_7svn	: param.msmt_valu_7svn,
									msmt_valu_8egh	: param.msmt_valu_8egh,
									msmt_valu_9nin	: param.msmt_valu_9nin,
									msmt_valu_10	: param.msmt_valu_10,
									item_idcd		: param.item_idcd,
									insp_sbsc_dvcd	: param.insp_sbsc_dvcd,
									wkct_insp_dvcd	: param.wkct_insp_dvcd,
									wkod_numb		: wkod_numb,
									lott_numb		: param.lott_numb
								});
								store.add(record);
								store.sync({
									callback: function(batch, options) {
										store.reload();
										this.up('form').getForm().reset();
										this.up('window').hide();
									} ,
									scope: this
								},{	synchro : _global.objects.synchro,_set : _set} );
							}
						}
					},{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				],
				checkValue:function(){
					var panel			= this,
						judt_dvcd		= panel.down('[name=judt_dvcd]'),
						uppr_valu		= panel.down('[name=uppr_valu]').getValue(),
						lwlt_valu		= panel.down('[name=lwlt_valu]').getValue(),
						msmt_valu_1		= panel.down('[name=msmt_valu_1fst]').getValue(),
						msmt_valu_2		= panel.down('[name=msmt_valu_2snd]').getValue(),
						msmt_valu_3		= panel.down('[name=msmt_valu_3trd]').getValue(),
						msmt_valu_4		= panel.down('[name=msmt_valu_4frt]').getValue(),
						msmt_valu_5		= panel.down('[name=msmt_valu_5fit]').getValue(),
						msmt_valu_6		= panel.down('[name=msmt_valu_6six]').getValue(),
						msmt_valu_7		= panel.down('[name=msmt_valu_7svn]').getValue(),
						msmt_valu_8		= panel.down('[name=msmt_valu_8egh]').getValue(),
						msmt_valu_9		= panel.down('[name=msmt_valu_9nin]').getValue(),
						msmt_valu_10	= panel.down('[name=msmt_valu_10]').getValue(),
						poor_qntt		= panel.down('[name=poor_qntt]').getValue(),
						array			= [msmt_valu_1,msmt_valu_2,msmt_valu_3,msmt_valu_4,msmt_valu_5,msmt_valu_6,msmt_valu_7,msmt_valu_8,msmt_valu_9,msmt_valu_10]
						check			= 0;

					;
					for (var i = 0; i < array.length; i++) {
						if(array[i]!=null){
							if(array[i] >uppr_valu||array[i]<lwlt_valu){
								judt_dvcd.setValue('2');
								check = 1;
								return;
							}
						}
					}
					if(check==0){
						if(poor_qntt>0){
							judt_dvcd.setValue('2');
						}else{
							judt_dvcd.setValue('1');
						}
					}
				}
			});

			win = Ext.widget('window', {
				title: '검사입력',
				closeAction: 'hide',
				width: 450,
				height: 690,
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