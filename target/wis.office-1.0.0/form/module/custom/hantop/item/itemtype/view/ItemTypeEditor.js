Ext.define('module.custom.hantop.item.itemtype.view.ItemTypeEditor', { extend: 'Axt.form.Editor' ,
	alias		: 'widget.module-itemtype-editor' ,
	height		: 230,

	layout		: {
		type	: 'border'
	},
	collapsible	: true,
	collapsed	: true ,

	title		: Language.get('wdtp_idcd','창호형태 정보'),

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest() ];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			};
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item =
				{	xtype	: 'form-panel',
					dock	: 'left',
					width	: 330,
					bodyStyle: { padding: '5px' },
					fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset',
							layout	: 'vbox',
							padding	:'0',
							border	: 0,
							margin	: '10 0 5 0',
							items : [
								{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items : [
										{	fieldLabel	: Language.get('wdgr_name'	,'창호그룹') ,
											name		: 'wdgr_name',
											xtype 		: 'textfield',
											editable	: false,
											readOnly	: true,
							 				fieldCls   : 'readonlyfield',
											width		: 290 ,
											margin		: '0 0 0 5',
											hidden		: true
										}
									]
								},{ xtype : 'textfield', name:'wdgr_idcd', hidden : true
								},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items : [
										{	fieldLabel	: Language.get('wdtp_code'	,'형태코드') ,
											name		: 'wdtp_code',
											xtype 		: 'textfield',
											editable	: false,
											width		: 215 ,
											margin		: '0 0 0 5',
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
										},{	name		: 'line_stat',
											xtype 		: 'lookupfield',
											editable	: false,
											width		: 70 ,
											margin		: '0 0 0 5',
											lookupValue	: resource.lookup('line_stat'),
										},{ xtype	:'textfield',name : 'wdtp_idcd', hidden:true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items : [
										{	fieldLabel	: Language.get('wdtp_name'	,'형태명') ,
											name		: 'wdtp_name',
											xtype 		: 'textfield',
											editable	: false,
											width		: 290 ,
											margin		: '0 0 0 5',
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items : [
										{	fieldLabel	: Language.get(''	,'고유번호') ,
											name		: '',
											xtype 		: 'textfield',
											editable	: false,
											width		: 290 ,
											margin		: '0 0 0 5',
										}
									]
								},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
								},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
								},{	name		: 'imge_chek3', xtype : 'textfield' , hidden : true
								},{	name		: 'imge_chek4', xtype : 'textfield' , hidden : true
								},{	name		: 'imge_chek5', xtype : 'textfield' , hidden : true
								},{	name		: 'imge_chek6', xtype : 'textfield' , hidden : true
								},{	name		: 'imge_chek7', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('modify','수정'),
									xtype		: 'textfield',
									name		: 'modify',
									width		: 170,
									hidden		: true
								}
							]
						}
					]
				};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this, item =
			{	xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0 ,
				plain	: true,
				items	: [ me.createTab1()]
			};
		return item;
	},

	/**
	 * 이미지
	 */
	createTab1 : function() {
		var me = this,
			item = {
				title			: '이미지',
				name		: 'imge_info',
				xtype		: 'form-panel',
				dock			:'left',
				region		: 'center',
				layout		: 'vbox',
				border		: 0,
				autoScroll		:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							margin	: '5 0 0 0',
							border	: 0,
							items	: [
								{	xtype			: 'form-panel',
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : ''},
									border			: 0,
									items			: [
										{	xtype	: 'form-panel',
											name	: 'uploadForm',
											region	: 'center',
											standardSubmit: false,
											border	:  false,
											url		: 'system/custom/hantop/item/itemtype/set/fileUpload.do',
											timeout	: 120000,
											method	: 'POST',
											layout		: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout		: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
											items		:[
												{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지1',
													itemId			: 'files1',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek1]').setValue('Y');
																	form.down('[name=image]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
												},{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지2',
													msgTarget	: 'side',
													itemId			: 'files2',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader()
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek2]').setValue('Y');
																	form.down('[name=image2]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek2]').setValue('');
																form.down('[name=image2]').setSrc('');
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
												},{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지3',
													itemId			: 'files3',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek3]').setValue('Y');
																	form.down('[name=image3]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek3]').setValue('');
																form.down('[name=image3]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle3
												},{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지4',
													itemId			: 'files4',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek4]').setValue('Y');
																	form.down('[name=image4]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek4]').setValue('');
																form.down('[name=image4]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle4
												},{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지5',
													itemId			: 'files5',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek5]').setValue('Y');
																	form.down('[name=image5]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek5]').setValue('');
																form.down('[name=image5]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle5
												},{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지6',
													itemId			: 'files6',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek6]').setValue('Y');
																	form.down('[name=image6]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek6]').setValue('');
																form.down('[name=image6]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle6
												},{	xtype			: 'filefield',
													name			: 'files',
													fieldLabel		: '이미지7',
													itemId			: 'files7',
													margin			: '0 3 0 0 ',
													width			: 110,
													fieldStyle		: 'display:none',
													buttonText	: '선택',
													regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners		: {
														change		: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek7]').setValue('Y');
																	form.down('[name=image7]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek7]').setValue('');
																form.down('[name=image7]').setSrc('')
															}
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle7
												},{xtype:'hiddenfield', name:'param', value:''
												},{xtype:'hiddenfield', name:'token', value:_global.token_id }
											]
										}
									]
								}
							]
						/* 이미지를 보여줄 panel */
						},{	xtype 	: 'panel',
							layout	: 'hbox',
							margin	: '0 0 0 25',
							border	: 0,
							autoscroll : true,
							items 	: [
								{	xtype	: 'image',
									name	: 'image',
									id			: 'prjt_work_imge',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 5',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									id			: 'prjt_work_imge2',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 17',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image3',
									id			: 'prjt_work_imge3',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 15',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image4',
									id			: 'prjt_work_imge4',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 15',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image5',
									id			: 'prjt_work_imge5',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 15',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image6',
									id			: 'prjt_work_imge6',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 12',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image7',
									id			: 'prjt_work_imge7',
									src		: '',
									width	: 120,
									height	: 100,
									margin	: '5 15',
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
						},{	xtype		:'textfield',
							name		: 'imge_6six',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image6]').setSrc(url);
									}else{
										this.up('form').down('[name=image6]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'imge_7svn',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image7]').setSrc(url);
									}else{
										this.up('form').down('[name=image7]').setSrc('');
									}
								}
							}
						}
					]
				}
			;
		return item;
	},


	/* 이미지 삭제 */
	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek1]').setValue('Y');
		form.down('[name=image]').setSrc('');
		form.down('[name=imge_1fst]').setValue('');
		form.down('[itemId=files1]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek2]').setValue('Y');
		form.down('[name=image2]').setSrc('');
		form.down('[name=imge_2snd]').setValue('');
		form.down('[itemId=files2]').fileInputEl.dom.value = '';
	},
	imgCancle3:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek3]').setValue('Y');
		form.down('[name=image3]').setSrc('');
		form.down('[name=imge_3trd]').setValue('');
		form.down('[itemId=files3]').fileInputEl.dom.value = '';
	},
	imgCancle4:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek4]').setValue('Y');
		form.down('[name=image4]').setSrc('');
		form.down('[name=imge_4frt]').setValue('');
		form.down('[itemId=files4]').fileInputEl.dom.value = '';
	},
	imgCancle5:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek5]').setValue('Y');
		form.down('[name=image5]').setSrc('');
		form.down('[name=imge_5fit]').setValue('');
		form.down('[itemId=files5]').fileInputEl.dom.value = '';
	},
	imgCancle6:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek6]').setValue('Y');
		form.down('[name=image6]').setSrc('');
		form.down('[name=imge_6six]').setValue('');
		form.down('[itemId=files6]').fileInputEl.dom.value = '';
	},
	imgCancle7:function(){
		var form = this.up('form').up('[name=imge_info]');
		var check = Ext.ComponentQuery.query('module-itemtype-editor')[0];
		check.down('[name=imge_chek7]').setValue('Y');
		form.down('[name=image7]').setSrc('');
		form.down('[name=imge_7svn]').setValue('');
		form.down('[itemId=files7]').fileInputEl.dom.value = '';
	}

});


