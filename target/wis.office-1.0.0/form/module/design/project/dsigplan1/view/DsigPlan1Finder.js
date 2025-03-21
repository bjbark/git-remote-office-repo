Ext.define('module.design.project.dsigplan1.view.DsigPlan1Finder', { extend: 'Axt.form.Editor',

	alias: 'widget.module-dsigplan1-finder',

//	height : 841,
	width	: 430,
	layout : {
		type: 'border'
	},

	title			: Language.get('prjt_info','수주 정보'),
	collapsible 	: false	,
	collapsed		: false	,
	defaultFocus	: 'pjod_code',

	initComponent: function(config){
		var me = this;
//		me.dockedItems = [ me.createDock()];
		me.items = [me.createwest(),me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				region			: 'center',
				border			: 2,
				autoScroll		: true,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	name	: 'prjt_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_idcd', '금형번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pjod_idcd',
								allowBlank	: false,
								clearable	: true ,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 320,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-pjod-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('pjod_idcd'));
										var img = null,
											blob = null,
											url = null,
											img2 = null,
											blob2 = null,
											url2 = null
										;
										if(records[0].get('item_imge')){
											img = new Uint8Array(records[0].get('item_imge').split(","));
											blob = new Blob([img],{type:'image/png'})
											url = URL.createObjectURL(blob);
										}
										if(records[0].get('item_imge2')){
											img2 = new Uint8Array(records[0].get('item_imge2').split(","));
											blob2 = new Blob([img2],{type:'image/png'})
											url2 = URL.createObjectURL(blob2);
										}
										var editor = Ext.ComponentQuery.query('module-dsigplan1-finder')[0],
											panel = editor.down('form'),
											pjod_name		= panel.down('[name=pjod_name]'),
											line_stat		= panel.down('[name=line_stat]'),
											pjod_name		= panel.down('[name=pjod_name]'),
											pjod_dvcd		= panel.down('[name=pjod_dvcd]'),
											expt_dvcd		= panel.down('[name=expt_dvcd]'),
											deli_date		= panel.down('[name=deli_date]'),
											cstm_name		= panel.down('[name=cstm_name]'),
											drtr_name		= panel.down('[name=drtr_name]'),
											drtr_idcd		= panel.down('[name=drtr_idcd]'),
											item_name		= panel.down('[name=item_name]'),
											item_code		= panel.down('[name=item_code]'),
											item_spec		= panel.down('[name=item_spec]'),
											item_modl		= panel.down('[name=item_modl]'),
											mold_size		= panel.down('[name=mold_size]'),
											cavity			= panel.down('[name=cavity]'),
											mold_wigt		= panel.down('[name=mold_wigt]'),
											used_mtrl_name	= panel.down('[name=used_mtrl_name]'),
											prod_wigt		= panel.down('[name=prod_wigt]'),
											used_tons		= panel.down('[name=used_tons]'),
											cstm_idcd		= panel.down('[name=cstm_idcd]'),
											regi_date		= panel.down('[name=regi_date]'),
											img				= panel.down('[name=img]'),
											img2			= panel.down('[name=img2]'),
											prjt_idcd		= panel.down('[name=prjt_idcd]'),
											line_clos		= panel.down('[name=line_clos]'),
											tab1		= me.down('[title=주요 일정]'),
											tab2		= me.down('[title=프로젝트 정보]'),
											regi_date2	= tab1.down('[name=regi_date]')
											ppsl_deli_date = tab1.down('[name=ppsl_deli_date]'),
											deli_date2	= tab1.down('[name=deli_date]'),
											cofm_date	= tab1.down('[name=cofm_date]'),
											frst_exam_date = tab1.down('[name=frst_exam_date]'),
											send_exam_date = tab1.down('[name=send_exam_date]'),
											strt_date	= tab1.down('[name=strt_date]'),
											endd_date	= tab1.down('[name=endd_date]'),
											prjt_code2	= tab2.down('[name=prjt_code]'),
											prjt_name2	= tab2.down('[name=prjt_name]'),
											cstm_name2	= tab2.down('[name=cstm_name]'),
											regi_date3	= tab2.down('[name=regi_date]'),
											item_name2	= tab2.down('[name=item_name]'),
											modl_name2	= tab2.down('[name=modl_name]'),
											line_stat2	= tab2.down('[name=line_stat]')
										;
										line_stat		.setValue(records[0].get('line_stat'));
										pjod_name		.setValue(records[0].get('pjod_name'));
										pjod_dvcd		.setValue(records[0].get('pjod_dvcd'));
										expt_dvcd		.setValue(records[0].get('expt_dvcd'));
										deli_date		.setValue(records[0].get('deli_date'));
										deli_date2		.setValue(records[0].get('deli_date'));
										cstm_name		.setValue(records[0].get('cstm_name'));
										cstm_idcd		.setValue(records[0].get('cstm_idcd'));
										drtr_name		.setValue(records[0].get('drtr_name'));
										drtr_idcd		.setValue(records[0].get('drtr_idcd'));
										item_name		.setValue(records[0].get('item_name'));
										item_code		.setValue(records[0].get('item_code'));
										item_spec		.setValue(records[0].get('item_spec'));
										item_modl		.setValue(records[0].get('item_modl'));
										mold_size		.setValue(records[0].get('mold_size'));
										cavity			.setValue(records[0].get('cavity'));
										mold_wigt		.setValue(records[0].get('mold_wigt'));
										used_mtrl_name	.setValue(records[0].get('used_mtrl_name'));
										prod_wigt		.setValue(records[0].get('prod_wigt'));
										used_tons		.setValue(records[0].get('used_tons'));
										regi_date		.setValue(records[0].get('regi_date'));
										regi_date2		.setValue(records[0].get('regi_date'));
										cofm_date		.setValue(records[0].get('cofm_date'));
										frst_exam_date	.setValue(records[0].get('frst_exam_date'));
										send_exam_date	.setValue(records[0].get('send_exam_date'));
										strt_date		.setValue(records[0].get('strt_date'));
										endd_date		.setValue(records[0].get('endd_date'));
										ppsl_deli_date	.setValue(records[0].get('ppsl_deli_date'));
										prjt_code2		.setValue(records[0].get('pjod_code'));
										prjt_name2		.setValue(records[0].get('pjod_name'));
										cstm_name2		.setValue(records[0].get('cstm_name'));
										regi_date3		.setValue(records[0].get('regi_date'));
										item_name2		.setValue(records[0].get('item_name'));
										modl_name2		.setValue(records[0].get('modl_name'));
										line_stat2		.setValue(records[0].get('line_stat'));
										img				.setValue(url);
										img2			.setValue(url2);
										prjt_idcd		.setValue(records[0].get('prjt_idcd'));
										line_clos		.setValue(records[0].get('line_clos'));

										var listerdetail = Ext.ComponentQuery.query('module-dsigplan1-lister-detail1')[0];
										listerdetail.select({
											callback:function(records, operation, success) {
												if (success) {
													listerdetail.getSelectionModel().select(0);
												} else {
												}
											}, scope:me
										}, Ext.merge( {stor_id : _global.stor_id, pjod_idcd : records[0].get('pjod_idcd')}) );
									}
								}
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat')	,
								width		: 75,
								margin		: '0 0 0 5',
								readOnly	: true
							}
						]
					},{	xtype		: 'textfield',
						name		: 'line_clos',
						hidden		: true,
						listeners	:{
							render:function(val){
								var lister	= Ext.ComponentQuery.query('module-dsigplan1-lister-detail1')[0],
									button	= lister.down('[text=<span class="write-button">일정조정</span>]');
									approve	= lister.down('[text=<span class="write-button">승인</span>]');
									cancel	= lister.down('[text=<span class="write-button">해제</span>]');
								if(val.getValue()==''){
									approve.setVisible(false);
									cancel.setVisible(false);
								}
							},
							change:function(val){
								var lister	= Ext.ComponentQuery.query('module-dsigplan1-lister-detail1')[0],
									button	= lister.down('[text=<span class="write-button">일정조정</span>]');
									approve	= lister.down('[text=<span class="write-button">승인</span>]');
									cancel	= lister.down('[text=<span class="write-button">해제</span>]');
								if(val.getValue()=="0"){
									button.setVisible(true);
									approve.setVisible(true);
									cancel.setVisible(false);
								}else if(val.getValue()=="1"){
									button.setVisible(false);
									approve.setVisible(false);
									cancel.setVisible(true);
								}
							}
						}
					},{	fieldLabel	: Language.get('pjod_name','프로젝트명'),
						xtype		: 'textfield'						,
						name		: 'pjod_name',
						hidden		: true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_dvcd','수주구분'),
								xtype		: 'lookupfield',
								name		: 'pjod_dvcd',
								lookupValue	: resource.lookup('pjod_dvcd')	,
								width		: 200,
								readOnly	: true
							},{	fieldLabel	: Language.get('expt_dvcd', '수출구분'),
								xtype		: 'lookupfield',
								name		: 'expt_dvcd',
								lookupValue	: resource.lookup('expt_dvcd')	,
								width		: 200,
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('regi_date','수주일자'),
								xtype		: 'datefield',
								name		: 'regi_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200,
								readOnly	: true,
							},{	fieldLabel	: Language.get('deli_date','요청납기'),
								xtype		: 'datefield',
								name		: 'deli_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200,
								readOnly	: true,
							}
						]
					},{	fieldLabel	: Language.get('pjod_name','거래처명'),
						xtype		: 'textfield',
						name		: 'cstm_name',
					},{	fieldLabel	: '영업담당',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'drtr_name',
						pair		: 'drtr_idcd',
						allowBlank	: true,
						clearable	: false ,
						readOnly	: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-user-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name	: 'drtr_idcd', xtype : 'textfield' , hidden : true
					},{	name	: 'cstm_idcd', xtype : 'textfield' , hidden : true,
						listeners	:{
							change:function(){
								var cstm_idcd = this.getValue();
								var results;
								Ext.Ajax.request({
									url		: _global.location.http() + '/design/dsigplan1/get/getcstm.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id		: _global.stor_id,
											hqof_idcd	: _global.hqof_idcd,
											cstm_idcd	: cstm_idcd
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
											results = result;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								if(results){
									var tab1 = me.down('[title=거래처 정보]'),
										bzmn_name = tab1.down('[name=bzmn_name]'),
										buss_numb = tab1.down('[name=buss_numb]'),
										buss_kind = tab1.down('[name=buss_kind]'),
										buss_type = tab1.down('[name=buss_type]'),
										corp_dvcd = tab1.down('[name=corp_dvcd]'),
										boss_name = tab1.down('[name=boss_name]'),
										tele_numb = tab1.down('[name=tele_numb]'),
										faxi_numb = tab1.down('[name=faxi_numb]')
										mail_addr = tab1.down('[name=mail_addr]')
										hdph_numb = tab1.down('[name=hdph_numb]')
										post_code = tab1.down('[name=post_code]')
										addr_1fst = tab1.down('[name=addr_1fst]')
										addr_2snd = tab1.down('[name=addr_2snd]')
									;
									if(results.records.length){
										bzmn_name.setValue(results.records[0].buss_name);
										buss_numb.setValue(results.records[0].buss_numb);
										buss_kind.setValue(results.records[0].buss_kind);
										buss_type.setValue(results.records[0].buss_type);
										corp_dvcd.setValue(results.records[0].corp_dvcd);
										boss_name.setValue(results.records[0].boss_name);
										tele_numb.setValue(results.records[0].tele_numb);
										faxi_numb.setValue(results.records[0].faxi_numb);
										mail_addr.setValue(results.records[0].mail_addr);
										hdph_numb.setValue(results.records[0].hdph_numb);
										post_code.setValue(results.records[0].post_code);
										addr_1fst.setValue(results.records[0].addr_1fst);
										addr_2snd.setValue(results.records[0].addr_2snd);
									}
								}

							}
						}
					},{	fieldLabel	: Language.get('acpt_numb','금형코드'),
						xtype		: 'textfield',
						name		: 'item_code',
						readOnly	: true,
						hidden		: true
					},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
						xtype		: 'textfield',
						name		: 'item_name',
						readOnly	: true
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						readOnly	: true,
						hidden		: true
					},{	fieldLabel	: Language.get('item_modl','차종'),
						xtype		: 'textfield',
						name		: 'item_modl',
						readOnly	: true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('mold_size','Size'),
								xtype		: 'numericfield',
								name		: 'mold_size',
								width		: 200,
								readOnly	: true,
							},{	fieldLabel	: Language.get('cavity','Cavity'),
								xtype		: 'textfield',
								name		: 'cavity',
								width		: 200,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('mold_wigt','금형중량'),
								xtype		: 'numericfield',
								name		: 'mold_wigt',
								width		: 200,
								readOnly	: true,
							},{	fieldLabel	: Language.get('used_mtrl_name','성형재료'),
								xtype		: 'textfield',
								name		: 'used_mtrl_name',
								width		: 200,
								readOnly	: true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('prod_wigt','제품중량'),
								xtype		: 'numericfield',
								name		: 'prod_wigt',
								width		: 200,
								readOnly	: true,
							},{	fieldLabel	: Language.get('used_tons','사출기'),
								xtype		: 'numericfield',
								name		: 'used_tons',
								width		: 200,
								readOnly	: true,
							}
						]
					},{	xtype	:'form-panel' ,
						region	:'center',
						layout	: 'border',
						border	: false,
						layout	: { type: 'vbox', align: 'stretch'} ,
						items	: [
							{	xtype	: 'image',
								name	: 'image',
						//		src		: 'design/dsigplan1/set/fileDownload.do',
								width	: 300,
								height	: 200,
								margin	: '20 55',
								hidden	:true
							},{	xtype	: 'image',
								name	: 'image2',
						//		src		: 'design/dsigplan1/set/fileDownload.do',
								width	: 300,
								height	: 200,
								margin	: '20 55',
								hidden	:true
							},{	xtype		:'textfield',
								name		: 'img',
								hidden		:true,
								listeners	: {
									change:function(val){
										if(val.getValue()){
											this.up('form').down('[name=image]').show();
											this.up('form').down('[name=image]').setSrc(val.getValue());
							//				Ext.get('image1').dom.src = val.getValue();
							//				URL.revokeObjectURL(val.getValue());
										}else{
											this.up('form').down('[name=image]').hide();
											this.up('form').down('[name=image]').setSrc('');
							//				Ext.get('image1').dom.src = val.getValue();
										}
									}
								}
							},{	xtype		:'textfield',
								name		: 'img2',
								hidden		:true,
								listeners	: {
									change:function(val){
										if(val.getValue()){
											this.up('form').down('[name=image2]').show();
											this.up('form').down('[name=image2]').setSrc(val.getValue());
							//				URL.revokeObjectURL(val.getValue());
										}else{
											this.up('form').down('[name=image2]').hide();
											this.up('form').down('[name=image2]').setSrc();
										}
									}
								}
							},
						]
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'south',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(),me.createTab3(), me.createTab4()],
				height	: 250
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
			item = {
				title	: '거래처 정보',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									width		: 200,
									fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	fieldLabel	: '사업자명'	, name : 'bzmn_name'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel	: '사업자번호'	, name : 'buss_numb'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true ,
										},{	fieldLabel	: '업태'		, name : 'buss_kind'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel	: '업종'		, name : 'buss_type'	, xtype  : 'textfield'	, readOnly : true	, onwerEditing : true
										}
									]
								},{	xtype		: 'form-panel',
									border		:   0,
									width		: 200,
									fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	fieldLabel : '사업자 구분'	, name : 'corp_dvcd'	, xtype : 'lookupfield'	,readOnly : true, lookupValue   : resource.lookup('corp_dvcd') , onwerEditing : true
										},{	fieldLabel : '대표자명'	, name : 'boss_name'	, xtype : 'textfield'	, readOnly : true	, onwerEditing : true
										},{	fieldLabel : '전화번호'	, name : 'tele_numb'	, xtype : 'textfield'	, vtype : 'phone'	, readOnly   : true , onwerEditing : true
										},{	fieldLabel : '팩스번호'	, name : 'faxi_numb'	, xtype : 'textfield'	, vtype : 'fax'		, onwerEditing : true,readOnly : true
										}
									]
								}
							]
						},{	layout		: 'hbox',
							border		: 0,
							region		: 'center',
							margin		: '0 0 5 0',
							width		: 400,
							fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
							items		: [
								{	fieldLabel : '계산서메일'	, name : 'mail_addr'	, xtype : 'textfield'	, vtype : 'email'	, readOnly   : true , onwerEditing : true, width:200,labelWidth:70
								},{	fieldLabel : '휴대전화'	, name : 'hdph_numb'	, xtype : 'textfield'	, vtype : 'mobile'	, onwerEditing : true , width:200,labelWidth:70, readOnly   : true
								}
							]
						},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
							width		: 400,
							fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '주소',
									xtype		: 'textfield',
									name		: 'post_code',
									readOnly	: true,
									vtype		: 'zipcode',
									width		: 160,

								},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 238, readOnly   : true
								}
							]
						},{	xtype		: 'textfield',
							name		: 'addr_2snd',
							width		: 325,
							readOnly	: true,
							margin		: '0 0 5 75'
						}
					]
				}
			;
		return item;
	},
	createTab2 : function() {
		var me = this,
			item = {
				title	: '게약금액 및 결제조건',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'vbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('esti_amnt','견적금액'),
											xtype		: 'numericfield',
											name		: 'esti_amnt',
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cont_amnt','계약금액'),
											xtype		: 'numericfield',
											name		: 'cont_amnt',
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cont_amnt','중도금액'),
											xtype		: 'numericfield',
											name		: 'cont_amnt',
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('cont_amnt','잔금'),
											xtype		: 'numericfield',
											name		: 'cont_amnt',
											width		: 200
										},{	fieldLabel	: Language.get('regi_date','일자'),
											xtype		: 'datefield',
											name		: 'nxrm_chek_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										}
									]
								}
							]
						}
					]
				}
			;
		return item;
	},
	createTab3 : function() {
		var me = this,
			item = {
				title	: '주요 일정',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'vbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('regi_date','견적일자'),
											xtype		: 'datefield',
											name		: 'regi_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										},{	fieldLabel	: Language.get('cofm_date','확정일자'),
											xtype		: 'datefield',
											name		: 'cofm_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('ppsl_deli_date','제안납기'),
												xtype		: 'datefield',
												name		: 'ppsl_deli_date',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												width		: 200,
												readOnly	: true
											},{	fieldLabel	: Language.get('deli_date','확정납기'),
												xtype		: 'datefield',
												name		: 'deli_date',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												width		: 200,
												readOnly	: true
											}
										]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('frst_exam_date','T0일자'),
											xtype		: 'datefield',
											name		: 'frst_exam_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										},{	fieldLabel	: Language.get('send_exam_date','T1일자'),
											xtype		: 'datefield',
											name		: 'send_exam_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('strt_date','착수일자'),
											xtype		: 'datefield',
											name		: 'strt_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										},{	fieldLabel	: Language.get('endd_date','종료일자'),
											xtype		: 'datefield',
											name		: 'endd_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('','기타1'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										},{	fieldLabel	: Language.get('','기타2'),
											xtype		: 'datefield',
											name		: '',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										}
									]
								}
							]
						}
					]
				}
			;
		return item;
	},
	createTab4 : function() {
		var me = this,
			item = {
				title	: '프로젝트 정보',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				hidden	: true,
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'vbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype	: 'fieldset'	, layout: 'hbox'	, padding: '0'	, border: 0	, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('prjt_code', '프로젝트 코드'),
											xtype		: 'textfield',
											name		: 'prjt_code',
											readOnly	: true,
											width		: 320,
										},{	xtype		: 'lookupfield',
											name		: 'line_stat',
											lookupValue	: resource.lookup('line_stat'),
											width		: 75,
											margin		: '0 0 0 5',
											readOnly	: true
										}
									]
								},{	fieldLabel	: '프로젝트명',
									xtype		: 'textfield',
									name		: 'prjt_name',
									readOnly	: true,
								},{	fieldLabel	: '거래처명',
									xtype		: 'textfield',
									name		: 'cstm_name',
									readOnly	: true
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('regi_date','등록일자'),
											xtype		: 'datefield',
											name		: 'regi_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200,
											readOnly	: true
										}
									]
								},{	fieldLabel	: Language.get('acpt_case_name', '금형명'),
									xtype		: 'textfield',
									name		: 'item_name',
									readOnly	: true,
								},{	fieldLabel	: '모델명',
									xtype		: 'textfield',
									name		: 'modl_name',
									readOnly	: true
								}
							]
						}
					]
				}
			;
		return item;
	}
});