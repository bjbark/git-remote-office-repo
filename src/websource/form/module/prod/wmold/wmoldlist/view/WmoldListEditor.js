Ext.define('module.prod.wmold.wmoldlist.view.WmoldListEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-wmoldlist-editor',
	height	: 480,
	layout	: {
	type	: 'border'
	},
	title			: Language.get('mold_info','목형 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	getStore: function() {
		return Ext.getStore( 'module.prod.wmold.wmoldlist.store.WmoldListInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest() ];
		me.items = [me.createTabs()];
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
				width			: 400,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '' , readOnly:true},
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acpt_numb','목형코드'),
								name		: 'mold_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat')
							}
						]
					},{	fieldLabel	: Language.get('acpt_case_name','목형명'),
						xtype		: 'textfield',
						name		: 'mold_name',
						width		: 340,
					},{	fieldLabel	: Language.get('mold_spec','목형규격'),
						xtype		: 'textfield',
						name		: 'mold_spec',
						width		: 340,
					},{	fieldLabel	: '거래처'	,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						width		: 340,
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						}
					},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('mngt_dept_name','관리부서')	,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						width		: 340,
						name		: 'mngt_dept_name',
						pair		: 'mngt_dept_idcd',
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-dept-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{ name		: 'mngt_dept_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('rcpt_cmpy_name','전인수업체')	,
						xtype		: 'textfield',
						width		: 340,
						name		: 'rcpt_cmpy_name'
					},{	fieldLabel	: Language.get('stor_plac','위치')	,
						xtype		: 'textfield',
						width		: 340,
						name		: 'stor_plac'
					},{	fieldLabel	: Language.get('used_tons','사용톤수'),					//temp
						xtype		: 'numericfield',
						name		: 'used_tons',

					},{	fieldLabel	: Language.get('prod_item','생산품목'),					// temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'item_name',
						pair		: 'item_idcd',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-item-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						}
					},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
					},
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 3',
						items	: [
							{	fieldLabel	: Language.get('puch_date','구매일자'),
								xtype		: 'datefield',
								name		: 'puch_date',
								itemId		: 'puch_date',
								width		: 168,
								labelWidth	: 77,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('dsse_date','폐기일자'),
								xtype		: 'datefield',
								name		: 'dsse_date',
								itemId		: 'dsse_date',
								width		: 169,
								labelWidth	: 77,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							}
						]
					},{	fieldLabel	: Language.get('egrv_numb','각인번호'),
						xtype		: 'textfield',
						name		: 'egrv_numb',
						width		: 340
					},{	fieldLabel	: Language.get('owne_riht','소유권자'),
						xtype		: 'textfield',
						name		: 'owne_riht',
						width		: 340
					},{	fieldLabel	: Language.get('norm_yorn','양산여부'),
						xtype		: 'lookupfield',
						name		: 'norm_yorn',
						width		: 200,
						lookupValue	: resource.lookup('yorn')
					},{	name : 'mold_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('user_memo','목형상태'),
						xtype		: 'textarea',
						name		: 'user_memo',
						width		: 340,
						height		: 50
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
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(), me.createTab2(),{title : '첨부파일',xtype: 'module-wmoldlist-editorlister'},{title : '이동정보',xtype: 'module-wmoldlist-movelister'},me.createTab3()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title	: '구매·제조사',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' , readOnly:true},
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('puch_cstm_name','구매거래처명'),			//temp
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'puch_cstm_name',
									pair		: 'puch_cstm_idcd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , row_sts : '0' },
										result : function(records, nameField, pairField) {
											panel = me.down('[name=vend_tele_numb]');
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
											panel.setValue(records[0].get('tele_numb'));
										}
									}
								},{	name : 'puch_cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('vend_tele_numb','거래처전화'),
									xtype		: 'textfield',
									name		: 'vend_tele_numb',
								},{	fieldLabel	: Language.get('afsv_tele_numb','AS전화'),
									xtype		: 'textfield',
									name		: 'afsv_tele_numb',
								},{	fieldLabel	: Language.get('make_natn_idcd','제조국가'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'make_natn_idcd',
									pair		: 'make_natn_idcd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-make-popup',
										params : { stor_grp : _global.stor_grp , row_sts : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('wkct_name'));
											pairField.setValue(records[0].get('wkct_code'));
										}
									}
								},{	fieldLabel	: Language.get('make_cmpy_name','제조사명'),
									xtype		: 'textfield',
									name		: 'make_cmpy_name',
								},{	fieldLabel	: Language.get('make_date','제작일'),
									xtype		: 'datefield',
									name		: 'make_date',
									width		: 200,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('puch_amnt','구매금액'),
									xtype		: 'numericfield',
									name		: 'puch_amnt',
								},{	fieldLabel	: Language.get('remk_text','비고'),
									xtype		: 'textarea',
									name		: 'remk_text',
									height		: 80,
									width		: 341
								},
							]
						}
					]
			}
			;
			return item;
	},createTab2 : function() {
		var me = this,
//		me.dockedItems = [ me.searchForm()];
//		me.items = [me.createTabs(), me.createForm()];
//		me.items = [me.createTabs()];
//		me.callParent(arguments)  ;
//	},
//	searchForm: function(){
//		var me = this,
//			form = {
//			xtype		: 'form-panel',
//			bodyStyle	: { padding: '0', background: 'transparent' },
//			dockedItems	: [
//				{	xtype	: 'toolbar',
//					dock	: 'top',
//					items	: [
			item = {
				title	: '생산정보,Shot',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , readOnly:true},
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('cavity','CAVITY'),
									xtype		: 'textfield',
									width		: 200,
									name		: 'cavity'
								},{	fieldLabel	: Language.get('mtrl_name','재질'),											//temp
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'mtrl_name',
									pair		: 'mtrl_bacd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , row_sts : '0', prnt_idcd : '3101' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_idcd'));
										}
									}
								},{	name : 'mtrl_bacd', xtype : 'textfield' , hidden : true
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0 , margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('mold_edtn_numb','목형판갯수'),						//temp
									xtype		: 'numericfield',
									width		: 200,
									name		: 'mold_edtn_numb'
								},{	fieldLabel	: Language.get('mtrl_2snd_name','재질2'),											//temp
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'mtrl_2snd_name',
									pair		: 'mtrl_2snd_bacd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , row_sts : '0', prnt_idcd : '3101' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_idcd'));
										}
									}
								},{	name : 'mtrl_2snd_bacd', xtype : 'textfield' , hidden : true
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('dsig_shot','설계Shot'),
									xtype		: 'numericfield',
									width		: 200,
									name		: 'dsig_shot'
								},{	fieldLabel	: Language.get('mold_grad_name','등급'),												//temp
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'mold_grad_name',
									pair		: 'mold_grad_bacd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , row_sts : '0', prnt_idcd : '3105' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('grad_idcd'));
										}
									}
								},{	name : 'mold_grad_bacd', xtype : 'textfield' , hidden : true
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('init_shot','초기Shot'),
									xtype		: 'numericfield',
									width		: 200,
									name		: 'init_shot'
								},{	fieldLabel	: Language.get('grad_2snd_name','등급2'),										//temp
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'grad_2snd_name',
									pair		: 'grad_2snd_bacd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , row_sts : '0', prnt_idcd : '3105' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_idcd'));
										}
									}
								},{	name : 'grad_2snd_bacd', xtype : 'textfield' , hidden : true
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('work_shot','작업Shot'),
									xtype		: 'numericfield',
									name		: 'work_shot',
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('totl_shot','누적Shot'),
									xtype		: 'numericfield',
									width		: 200,
									name		: 'totl_shot'
								},{	fieldLabel	: Language.get('runr_wigt','런너중량'),
									xtype		: 'numericfield',
									name		: 'runr_wigt',
									lookupValue	: resource.lookup('runr_wigt')
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('updt_expc_shot','수정예상Shot'),
									xtype		: 'numericfield',
									width		: 200,
									name		: 'updt_expc_shot'
								},{	fieldLabel	: Language.get('prod_wigt','제품중량'),
									xtype		: 'numericfield',
									name		: 'prod_wigt',
									lookupValue	: resource.lookup('prod_wigt')
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('updt_expc_date','수정예상일자'),
									xtype		: 'datefield',
									width		: 200,
									name		: 'updt_expc_date',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									//value : new Date(),
								},{	fieldLabel	: Language.get('cycl_time','회전시간'),
									xtype		: 'numericfield',
									name		: 'cycl_time',
								}
							]
						},{	fieldLabel	: Language.get('insp_type_name','검사유형'),											//temp
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 200,
							name		: 'insp_type_name',
							pair		: 'insp_type_idcd',
							style		: "text-align : right",
							margin		:'5 0 0 0',
							clearable	: false ,
							hidden		: _global.item_insp_type_yorn,  /* 여기를 수정할 경우 품목코드 등록 Editor 부분을 수정하여야 한다.  */
							popup: {
								select : 'SINGLE',
								widget : 'lookup-insptype-popup',
								params : { stor_grp : _global.stor_grp , row_sts : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('insp_type_name'));
									pairField.setValue(records[0].get('insp_type_idcd'));
								}
							}
						},{	xtype : 'textfield', name : 'insp_type_idcd', hidden:true
						}
					]
			}
		;
		return item;
	},
	createTab3 : function() {
		var me = this,
			item = {
				title	: '이미지',
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
				items	: [
					{	xtype 	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	xtype		: 'form-panel',
								border		: 0,
								fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
								items		: [
									{	xtype   : 'form-panel',
										name    : 'uploadForm',
										region  : 'center',
										standardSubmit: false,
										border :  false,
										url     : 'system/prod/wmold/wmoldmast/set/fileUpload.do',
										timeout : 120000,
										method  : 'POST',
										layout : { type: 'vbox', align: 'stretch' } ,
										padding : 10 ,
										layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
										items: [
											{	xtype		: 'label' , text : '목형' ,margin : '5 0 0 195'
											},{	xtype		: 'label' , text : '명판' ,margin : '5 0 0 375'
											},{	xtype		: 'label' , text : '카운터',margin : '5 0 0 375'
											},{	xtype		: 'label' , text : '제품' ,margin : '5 0 0 360'
											},{	xtype		: 'label' , text : '비콘' ,margin : '5 0 0 365'
											},{xtype:'hiddenfield', name:'param', value:''
											},{xtype:'hiddenfield', name:'token', value:_global.token_id }
										]
									}
								]
							}
						]
					},{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '15 0 0 45',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 160',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image3',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 140',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image4',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 140',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image5',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 140',
									hidden	: false
								}
							]
						},{	xtype		:'textfield',
							name		: 'imge_1fst',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'imge_2snd',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image2]').setSrc(url);
									}else{
										this.up('form').down('[name=image2]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'imge_3trd',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image3]').setSrc(url);
									}else{
										this.up('form').down('[name=image3]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'imge_4frt',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image4]').setSrc(url);
									}else{
										this.up('form').down('[name=image4]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'imge_5fit',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image5]').setSrc(url);
									}else{
										this.up('form').down('[name=image5]').setSrc('');
									}
								}
							}
						}
					]
				}
			;
		return item;
	}
});

