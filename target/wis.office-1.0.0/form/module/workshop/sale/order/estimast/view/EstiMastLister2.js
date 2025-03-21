Ext.define('module.workshop.sale.order.estimast.view.EstiMastLister2', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-workshop-estimast-lister2'			,
	store		: 'module.workshop.sale.order.estimast.store.EstiMast'	,


	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 765,
			bodyStyle	: { padding: '3px' },
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 20',
					items : [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '0 0 10 10',
								items : [
									{	fieldLabel	: Language.get('invc_numb','견적번호'),
										name		: 'invc_numb',
										xtype		: 'textfield',
										allowBlank	: false	,
										fieldCls	: 'requiredindex',
										width		: 150,
										readOnly	: true,
										margin		: '5 5 5 -10'
									},{	xtype		: 'textfield'	,
										name		: 'line_stat',
										lookupValue	: resource.lookup('line_stat'),
										width		: 60,
										readOnly	: true,
										margin		: '6 0 0 1'
									},{	fieldLabel	: Language.get('invc_date','견적일자'),
										xtype		: 'datefield',
										name		: 'invc_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										readOnly	: true,
										labelWidth	: 70,
										width		: 190
									},{	fieldLabel	: Language.get('deli_date','납기일자'),
										xtype		: 'datefield',
										name		: 'deli_date',
										readOnly	: true,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										labelWidth	: 70,
										width		: 190
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-15 0 0 10',
								items : [
									{	fieldLabel	: Language.get('mmbr', '고객명' ),
										name		: 'mmbr_name',
										readOnly	: true,
										xtype		: 'textfield',
										width		: 215,
										margin		: '5 0 0 -10',
									},{	fieldLabel	: Language.get('cstm_name','거래처명'),
										xtype		: 'textfield',
										name		: 'cstm_name',
										readOnly	: true,
										labelWidth	: 71,
										width		: 191
									},{	fieldLabel	: Language.get('tele_numb','전화번호'),
										xtype		: 'textfield',
										name		: 'tele_numb',
										readOnly	: true,
										labelWidth	: 70,
										width		: 190
									},{	fieldLabel	: Language.get('mail_addr','이메일'),
										xtype		: 'textfield',
										name		: 'mail_addr',
										readOnly	: true,
										labelWidth	: 70,
										width		: 190
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 10',
								items	: [
									{	fieldLabel	: Language.get('ttle','주문명'),
										xtype		: 'textfield',
										name		: 'ttle',
										readOnly	: true,
										width		: 406,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 10',
								items	: [
									{	fieldLabel	: Language.get('dlvy_mthd_dvcd','배송방법'),
										xtype		: 'textfield',
										name		: 'dlvy_mthd_dvcd',
										width		: 215,
										readOnly	: true,
										lookupValue	: resource.lookup('dlvy_mthd_dvcd')
									},{	fieldLabel	: Language.get('rctr_name','수취인'),
										xtype		: 'textfield',
										name		: 'rctr_name',
										labelWidth	: 66,
										readOnly	: true,
										width		: 187
									},{	fieldLabel	: Language.get('dlvy_tele_numb','전화번호'),
										xtype		: 'textfield',
										name		: 'dlvy_tele_numb',
										labelWidth	: 70,
										readOnly	: true,
										width		: 190,
									},{	fieldLabel	: Language.get('dlvy_exps','배송비'),
										name		: 'dlvy_exps',
										xtype		: 'numericfield',
										labelWidth	: 70,
										readOnly	: true,
										width		: 190
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 10',
								items	: [
									{	fieldLabel	: '배송지',
										xtype		: 'textfield',
										name		: 'post_code',
										readOnly	: true,
										width		: 130,
									},{	name	: 'addr_1fst' ,
										xtype  : 'textfield' ,
										margin : '6 0 2 2',
										width : 270
									},{	xtype		: 'textfield',
										name		: 'addr_2snd',
										width		: 385,
										readOnly	: true,
										margin		: '6 0 0 5'
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 10',
								items	: [
									{	fieldLabel	: Language.get('dlvy_memo','배송메모'),
										name		: 'dlvy_memo',
										xtype		: 'textarea',
										readOnly	: true,
										height		: 45,
										width		: 797,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 65',
								items	: [
									{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox' } ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 123,
										margin	: '0 0 0 0',
										items	: [
											{	text	: '인쇄비', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 45',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'esti_amnt',
														readOnly	: true,
														width		: 117
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 123,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '표지', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 50',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'esti_amnt_covr',
														readOnly	: true,
														width		: 117
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'},
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 123,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '간지', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 50',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'esti_amnt_indx',
														readOnly	: true,
														width		: 117
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 122,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '기타가공비', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 40',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'etcc_proc_amnt',
														readOnly	: true,
														width		: 116
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 122,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '합계금액', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 40',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'total',
														readOnly	: true,
														width		: 116
													}
												]
											}
										]
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('clss_desc','인쇄품목'),
										name		: 'clss_desc',
										xtype		: 'textfield',
										labelWidth	: 60,
										width		: 460,
										readOnly	: true,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('prnt_colr_name','컬러'),
										xtype		: 'textfield'	,
										name		: 'prnt_colr_name',
										labelWidth	: 60,
										width		: 170,
										readOnly	: true,
										margin		: '0 0 0 0'
									},{	fieldLabel	: Language.get('prnt_mthd_dvcd','인쇄방식'),
										xtype		: 'lookupfield'	,
										name		: 'prnt_mthd_dvcd',
										lookupValue	: resource.lookup('prnt_mthd_dvcd'),
										labelWidth	: 50,
										width		: 180,
										readOnly	: true,
										margin		: '0 0 0 25'
									},{	fieldLabel	: Language.get('shet_name','용지'),
										name		: 'shet_name',
										xtype		: 'textfield'	,
										labelWidth	: 50,
										width		: 190,
										readOnly	: true,
										margin		: '0 0 0 30',
									},{	fieldLabel	: Language.get('shet_size_dvcd','용지사이즈'),
										xtype		: 'lookupfield'	,
										name		: 'shet_size_dvcd',
										lookupValue	: resource.lookup('shet_size_dvcd'),
										labelWidth	: 60,
										width		: 180,
										readOnly	: true,
										margin		: '0 0 0 30'
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('page_qntt','페이지'),
										xtype		: 'numericfield'	,
										name		: 'page_qntt',
										labelWidth	: 50,
										width		: 110,
										readOnly	: true,
										margin		: '0 0 0 10'
									},{	fieldLabel	: Language.get('volm_qntt','권'),
										xtype		: 'numericfield'	,
										name		: 'volm_qntt',
										labelWidth	: 15,
										margin		: '0 0 0 0',
										readOnly	: true,
										width		: 50,
									},{	fieldLabel	: Language.get('bkbd_kind_dvcd','제본종류'),
										xtype		: 'lookupfield'	,
										name		: 'bkbd_kind_dvcd',
										lookupValue	: resource.lookup('bkbd_kind_dvcd'),
										labelWidth	: 50,
										width		: 180,
										readOnly	: true,
										margin		: '0 0 0 25',
									},{	fieldLabel	: Language.get('bkbd_dirt_dvcd','제본방향'),
										xtype		: 'lookupfield'	,
										name		: 'bkbd_dirt_dvcd',
										lookupValue	: resource.lookup('bkbd_dirt_dvcd'),
										labelWidth	: 50,
										width		: 190,
										readOnly	: true,
										margin		: '0 0 0 30'
									},{	fieldLabel	: Language.get('bkbd_bind','제본철'),
										xtype		: 'lookupfield'	,
										name		: 'bkbd_bind',
										lookupValue	: resource.lookup('bkbd_bind'),
										labelWidth	: 50,
										width		: 170,
										readOnly	: true,
										margin		: '0 0 0 40'
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('dirt_dvcd','방향'),
										xtype		: 'lookupfield'	,
										name		: 'dirt_dvcd',
										lookupValue	: resource.lookup('dirt_dvcd'),
										labelWidth	: 60,
										width		: 170,
										readOnly	: true,
										margin		: '0 0 0 0'
									},{	fieldLabel	: Language.get('esti_pric','견적단가'),
										name		: 'esti_pric',
										xtype		: 'textfield',
										readOnly	: true,
										labelWidth	: 50,
										width		: 180,
										margin		: '0 0 0 25',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('work_memo_item','작업메모'),
										name		: 'work_memo_item',
										xtype		: 'textarea',
										margin		: '0 0 0 0',
										labelWidth	: 60,
										height		: 45,
										width		: 806,
										readOnly	: true,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '3 0 0 2',
								items	: [
									{	xtype		: 'label',
										text		: '표지 및 간지',
										width		: 63,
										margin		: '0 0 0 0'
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox' } ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 100,
										margin	: '0 0 0 0',
										items	: [
											{	text	: '표지사양', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 32',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'covr_spec',
														readOnly	: true,
														width		: 94
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '표지컬러', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'prnt_colr_name_covr',
														readOnly	: true,
														width		: 74
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'},
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 125,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '표지원단', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 40',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'shet_name_covr',
														readOnly	: true,
														width		: 119
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '표지디자인', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'dsgn_code',
														readOnly	: true,
														width		: 74
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 90,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '표지금액', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 25',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'esti_amnt_covr',
														readOnly	: true,
														width		: 84
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 100,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '간지원단', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 30',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'shet_name_indx',
														readOnly	: true,
														width		: 94
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 100,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '간지페이지', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 25',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'page_prnt_side',
														readOnly	: true,
														width		: 94
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 70,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '색간지', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'textfield',
														name		: 'prnt_colr_name_indx',
														readOnly	: true,
														width		: 64
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 75,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '간지인쇄', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'lookupfield'	,
														name		: 'prnt_yorn',
														lookupValue	: resource.lookup('prnt_yorn'),
														readOnly	: true,
														width		: 69
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 90,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '색인표', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 30',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'lookupfield',
														name		: 'indx_yorn',
														readOnly	: true,
														lookupValue	: resource.lookup('yorn'),
														width		: 84
													}
												]
											}
										]
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 2',
								items	: [
									{	xtype		: 'label',
										text		: '후가공',
										width		: 40,
										margin		: '0 0 0 23'
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox' } ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 0 0',
										items	: [
											{	text	: '무색코팅', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'nocl_cotn_yorn',
														readOnly	: true,
														width		: 74,
														margin		: '0 0 4 31'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '광택코팅', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'vosh_cotn_yorn',
														readOnly	: true,
														width		: 74,
														margin		: '0 0 4 31'

													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'},
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 60,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '엠보싱', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'embo_yorn',
														readOnly	: true,
														width		: 54,
														margin		: '0 0 4 22'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer',
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 45,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '무광', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 11',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'ngls_yorn',
														readOnly	: true,
														width		: 39,
														margin		: '0 0 4 13'

													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 45,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '유광', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 11',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'ygls_yorn',
														readOnly	: true,
														width		: 39,
														margin		: '0 0 4 13'

													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 60,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '책받침', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 13',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'bkst_yorn',
														readOnly	: true,
														width		: 54,
														margin		: '0 0 4 22'

													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '무선제본', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'rdio_bkbd_yorn',
														readOnly	: true,
														width		: 74,
														margin		: '0 0 4 31'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '메탈와이어', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'mtrl_wire_yorn',
														readOnly	: true,
														width		: 74,
														margin		: '0 0 4 31'

													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 80,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '투명와이어', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'limp_wire_yorn',
														readOnly	: true,
														width		: 74,
														margin		: '0 0 4 31'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 70,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '바인더', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'bind_yorn',
														readOnly	: true,
														width		: 64,
														margin		: '0 0 4 28'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 100,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '소프트커버무선', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'scvr_rdio_yorn',
														readOnly	: true,
														width		: 94,
														margin		: '0 0 4 42'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 100,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '소프트커버펼침', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 15',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'scvr_open_yorn',
														readOnly	: true,
														width		: 94,
														margin		: '0 0 4 42'

													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 50,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '떡제본', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 10',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'dduk_yorn',
														readOnly	: true,
														width		: 44,
														margin		: '0 0 4 18'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 50,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '평철', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 14',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'flat_yorn',
														readOnly	: true,
														width		: 44,
														margin		: '0 0 4 18'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 50,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '반철', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 14',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'checkbox',
														name		: 'hfbk_yorn',
														readOnly	: true,
														width		: 44,
														margin		: '0 0 4 18'
													}
												]
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox'} ,
										style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
										width	: 70,
										margin	: '0 0 5 1',
										items	: [
											{	text	: '타공수', xtype : 'label', style : 'text-align:center;' , margin : '5 2 5 20',
											},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'hole_qntt',
														readOnly	: true,
														width		: 65
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	};
	return item;
	}
});