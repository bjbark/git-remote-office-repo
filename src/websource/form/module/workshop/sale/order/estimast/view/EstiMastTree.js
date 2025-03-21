Ext.define('module.workshop.sale.order.estimast.view.EstiMastTree', { extend:  'Axt.grid.Panel',
	alias		: 'widget.module-estimast-tree',
	store		: 'module.workshop.sale.order.estimast.store.EstiMastTree',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'checkboxmodel' , mode : 'SINGLE'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	viewConfig	: {
//		plugins: { ptype: 'treeviewdragdrop' }
	},
	initComponent: function () {
		var me = this;
		me.dockedItems  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->',
					'-',
					{	text: Const.INSERT.text , iconCls: Const.INSERT.icon , itemId : 'insertBom', handler : me.popup  ,cls: 'button-style' },
					{	text: Const.MODIFY.text , iconCls: Const.MODIFY.icon , itemId : 'modifyBom', handler : me.popup  ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , handler : me.deleteBom ,cls: 'button-style' },
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
					'-',
					{	xtype	: 'checkboxfield',
						checked	: false,
						name	: 'uploadChek',
						boxLabel:'삭제 후 등록', // 엑셀업로드시 기존것 삭제 후 등록여부
						hidden	: true,
						style	: {top:'5px',right:'10px'}
					} ,'-',
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center'},
				items		: [
//					{ dataIndex: 'row_number'		,text	: '순서'			, width :  40	, align : 'center', xtype : 'numericcolumn'
//					}
					{ dataIndex: 'line_seqn'		, text : '순번'			, width :  40	, align : 'left', hidden : false, align : 'center'
					},{ dataIndex: 'ttle'			,text	: '제목'	, width : 250
					},{ dataIndex: 'item_lcls_idcd'	, text : '품목종류id'		, width :  150	, align : 'left', hidden : true
					},{ dataIndex: 'clss_name'		, text : '품목종류'		, width :  150	, align : 'left'
					},{ dataIndex: 'shet_name'		, text : '사이즈'			, width :  40, hidden : true
					},{ dataIndex: 'horz_leng'		, text : '가로'			, width :  70, xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'vrtl_leng'		, text : '세로'			, width :  70, xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'volm_qntt'		, text : '수량'			, width :  70, xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'esti_amnt'		, text : '견적금액'		, width :  90,xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'work_memo'		, text : '작업메모'		, width : 300, align : 'left'
					},{header: '표지',
						sortable: false,
						width:70,
						itemId : 'drwBtn',
						name:'drwBtn',
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
//							if(rec.data.item_lcls_idcd != '000048'){
								if(rec.data.shet_count >= 1){
									Ext.defer(function() {
										Ext.widget('button', {
												renderTo: Ext.query("#"+id)[0],
												text	: '<span style="color : white !important">표지등록</span>',
												width	: 60,
												height	: 19,
//												hidden	: rec.data.item_lcls_idcd!= '000048',
												cls		: 'button-style',
												style	: 'background : #419641',
												handler	: function(){me.draw(rec)
											}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
												renderTo: Ext.query("#"+id)[0],
												text	: '<span style="color : white !important">표지등록</span>',
												width	: 60,
												height	: 19,
//												hidden	: rec.data.item_lcls_idcd!= '000048',
												cls		: 'button-style',
												handler	: function(){me.draw(rec)
											}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
//							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '내지',
						sortable: false,
						width:70,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.shet_count >= 1){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">내지등록</span>',
											width	: 60,
											height	: 19,
											cls		: 'button-style',
											style	: 'background : #419641',
											handler	: function(b){me.shetItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">내지등록</span>',
											width	: 60,
											height	: 19,
											cls		: 'button-style',
											handler	: function(b){me.shetItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '간지',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.indx_count > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">간지등록</span>',
											width	: 63,
											height	: 19,
											style	: 'background : #419641',
											cls		: 'button-style',
											handler	: function(b){me.mainItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">간지등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											handler	: function(b){me.mainItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '후가공',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.proc_count > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important">후가공등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											style	: 'background : #419641',
											handler	: function(){me.subItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important">후가공등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											handler	: function(){me.subItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
		}
		return item;
	},

	deleteBom:function(){
		var	me		= this,
			tree	= me.up('panel'),
			selects	= tree.getSelectionModel().getSelection()
		;
		if(selects.length>0){
			Ext.Msg.show({ title: '확인', msg: '삭제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						var a = [];
						Ext.Ajax.request({
							url		: _global.location.http() + '/workshop/sale/order/estimast/set/delete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb : selects[0].get('invc_numb'),
									line_seqn : selects[0].get('line_seqn')
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
									tree.getStore().load({
										params:{param:JSON.stringify({invc_numb:selects[0].get('invc_numb')}) }
									, scope:me,
									callback:function(records, operation, success) {
										if (success) {
											tree.getRootNode().expand();
											tree.getSelectionModel().select(0);
										} else {
										}
									}
								});
									me2.up('window').hide();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","삭제할 품목을 하나만 선택해주세요.");
		}
	},
	popup:function(){
		var	me		= this,
			tree	= me.up('panel'),
			selects	= tree.getSelectionModel().getSelection(),
			select	= tree.getSelectionModel().getSelection()[0],
			store	= tree.getStore(),
			editor	= Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
//			acpt_qntt = editor.getForm().getValues().acpt_qntt,
//			selc_need = select.data.need_qntt,
//			acpt_item = store.getRootNode().getChildAt(0).get('item_idcd'),
			invc_numb = editor.getForm().getValues().invc_numb,
			item_lcls_idcd,clss_name,shet_name,shet_name2,lcls_idcd,mcls_idcd,ttle,
			set,scls_idcd,horz_leng,vrtl_leng,cvst_qntt,fdat_size_name,fdat_size_idcd,work_size_idcd,
			work_size_name,esti_pric,work_memo, line_seqn,uper_seqn,param,ttle,shet_size_idcd,shet_size_idcd
			chk = true
		;

//		if(select.data.acct_bacd == '1001' || select.data.acct_bacd == '1002' || select.data.acct_bacd == '1003'){
//			if(me.itemId == 'insertBom'){
//				Ext.Msg.alert("알림","하위품목을 추가할 수 없는 품목입니다.");
//				return;
//			}
//		}

//		if(select.parentNode.data.id == 'root' && me.itemId != 'insertBom'){
//			Ext.Msg.alert("알림","수정할 수 없는 품목입니다.");
//			return;

//		}
		Ext.Ajax.request({
			url		: _global. location.http () + '/workshop/sale/order/estimast/get/maxid.do',
			method		: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					invc_numb	: invc_numb,
				})
			},
			async: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				seqn = result.records[0].seqn;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
//		console.log(seqn);
//		if(selects.length!=1){
			if(me.itemId == 'insertBom'){
				title			= '견적품목';
				set				= 'insert';
//				line_levl		= select.get('line_levl')+1;
//				prnt_idcd		= select.get('item_idcd');
//				acct_chek		= select.get('acct_bacd');
//				invc_numb		= invc_numb;
//				acpt_qntt		= acpt_qntt;
				line_seqn		= seqn;
//				selc_need		= selc_need;
				item_Id			= 'insertBom';
				dvcd			= 'insert';
			}else if (selects && selects.length != 0){
					title			= '견적품목 수정';
					set				= 'update';
					invc_numb		= select.get('invc_numb');
					ttle			= select.get('ttle');
					item_lcls_idcd	= select.get('item_lcls_idcd');
					clss_name		= select.get('clss_name');
					shet_name		= select.get('shet_name');
					shet_name2		= select.get('shet_name2');
					lcls_idcd		= select.get('item_lcls_idcd');
					mcls_idcd		= select.get('item_mcls_idcd');
					scls_idcd		= select.get('item_scls_idcd');
					horz_leng		= select.get('horz_leng');
					vrtl_leng		= select.get('vrtl_leng');
					cvst_qntt		= select.get('cvst_qntt');
					fdat_size_name	= select.get('fdat_size_name');
					fdat_size_idcd	= select.get('fdat_size_idcd');
					work_size_idcd	= select.get('work_size_idcd');
					shet_size_idcd	= select.get('shet_size_idcd');
					work_size_name	= select.get('work_size_name');
					esti_pric		= select.get('esti_pric');
					work_memo		= select.get('work_memo');
					line_seqn		= select.get('line_seqn');
//					uper_seqn		= uper_seqn;
//					dvcd			= 'update';
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth	: 70,
					labelStyle: 'text-align:right',
					width		: 800,
					labelSeparator : '',
				},
				items:[
					{	xtype : 'textfield', name : 'line_seqn', value : line_seqn, hidden : true
					},{	xtype : 'textfield', name : 'invc_numb', value : invc_numb, hidden : true
					},{	fieldLabel	: Language.get('ttle','제목'),
						name		: 'ttle',
						itemId		: 'ttle',
						value		: ttle,
						xtype		: 'textfield',
						labelWidth	: 60,
						width		: 370,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: '품목종류',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 60,
								width		: 200,
								name		: 'clss_name',
								pair		: 'item_lcls_idcd',
								value		: clss_name,
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'module-workshop-item-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '2' , line_levl : '1'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('clss_name'));
										pairField.setValue(records[0].get('clss_idcd'));
		//								var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
										var post = form.down('[itemId=post]');
										if(records[0].get('clss_idcd')=="000049"){
//											post.down('[name=post_chk]').setValue('Y');
//											post.show();
										}else{
//											post.down('[name=post_chk]').setValue('');
//											post.hide();
										}
									}
								},
								listeners	: {
									change	: function(){
										var val  = this.getValue(),
										val2 = form.down('[name=item_lcls_idcd]')
										;
										console.log(val);
										if(val == ""){
											val2.setValue(null)
										}
									}
								},
							},{	name		: 'item_lcls_idcd', xtype : 'textfield' , hidden : true,value:item_lcls_idcd,
								listeners	: {
									change	: function(){
										var val  = this.getValue(),
											val2 = form.down('[name=shet_name]')
											val3 = form.down('[name=shet_name2]')
										;
										if( val == '000090'){
											var size   = form.down('[itemId=size]');
											size.show();
										}else {
											var val = null;
											var size   = form.down('[itemId=size]');
											size.hide();
										}
//											val2.setValue(null);
//											val3.setValue(null);
										if( val == '' || val == null ){
		//									var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb :'' });
//											var post   = me.down('[itemId=post]');
		//									me.down('[name=esti_pric]').popup.params = merge;
											//post 초기화
//											post.down('[name=post_chk]').setValue('');
										}
										if( val == '000048' || val == null){
											form.down('[name=shet_name]').show();
											form.down('[name=shet_name2]').hide();
//											post.hide();
										}else if ( val == '000049'){
											form.down('[name=shet_name2]').show();
											form.down('[name=shet_name2]').popup.params.lcls_idcd = '000049';
											form.down('[name=shet_name2]').popup.params.mcls_idcd = '000065';
											form.down('[name=shet_name2]').popup.params.scls_idcd = '000068';
											form.down('[name=shet_name]').hide();
										}else if ( val == '000090'){
											form.down('[name=shet_name2]').show();
											form.down('[name=shet_name2]').popup.params.lcls_idcd = '000090';
											form.down('[name=shet_name2]').popup.params.mcls_idcd = '000092';
											form.down('[name=shet_name2]').popup.params.scls_idcd = '000094';
											form.down('[name=shet_name]').hide();
											form.down('[itemId=size]').show();
										}
									}
								}

							},{	fieldLabel	: Language.get('shet_name','용지사이즈'),
								xtype		: 'popupfield',
								name		: 'shet_name',
								pair		: 'shet_size_idcd',
								value		: shet_name,
								labelWidth	: 60,
								width		: 170,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								margin		: '0 1 0 0',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-clss-popup3',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', mcls_idcd : '000099' , lcls_idcd : '000048'},
									result	: function(records, nameField, pairField) {
										var panel1 = nameField.up('form');
										panel1.down('[name=horz_leng]').setValue(records[0].get('horz_leng'));
										panel1.down('[name=vrtl_leng]').setValue(records[0].get('vrtl_leng'));
										panel1.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
										panel1.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
										panel1.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
										nameField.setValue(records[0].get('shet_name'));
										pairField.setValue(records[0].get('shet_idcd'));
//										var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
									},
									create : function (self ) {
										if((form.down('[name=item_lcls_idcd]')).value == '' || ((form.down('[name=item_lcls_idcd]')).value == null)){
											Ext.Msg.alert("알림","품목종류를 먼저 선택하여 주십시오.");
											popup.close();
											return;
										}
									}
								},
								listeners	: {
									change	: function(){
										var val  = this.getValue(),
										val2 = form.down('[name=horz_leng]')
										val3 = form.down('[name=vrtl_leng]')
										;
										console.log(val);
										if(val == ""){
											val2.setValue(null);
											val3.setValue(null);
										}
									}
								},
							},{	name : 'lcls_idcd', xtype	: 'textfield', hidden : true,value		: lcls_idcd,
							},{	name : 'mcls_idcd', xtype	: 'textfield', hidden : true,width		: 100,value		: mcls_idcd,
							},{	name : 'scls_idcd', xtype	: 'textfield', hidden : true,width		: 100,value		: scls_idcd,
							},{	xtype		: 'textfield',
								hidden		: true,
								name		: 'post_chk'
							},{	name : 'shet_size_idcd', xtype	: 'textfield', hidden : true,
								listeners	: {
									change	: function(){
										form.down('[name=esti_pric]').popup.params.scls_idcd = form.down('[name=scls_idcd]').getValue();
										if(this.value == ''){
											form.down('[name=shet_size_idcd]').setValue(null);
											form.down('[name=scls_idcd]').setValue(null);
										}
									}
								}
//								listeners:{
//									change	: function(){
//										me.down('[name=esti_pric2]').popup.params.scls_idcd = me.down('[name=scls_idcd]').getValue();
//										if(this.value == ''){
//											me.down('[name=shet_size_idcd]').setValue(null);
//											me.down('[name=scls_idcd]').setValue(null);
//										}
//									}
//
//								}
							},{	fieldLabel	: Language.get('shet_name2','사이즈'),
								xtype		: 'popupfield',
								name		: 'shet_name2',
								pair		: 'shet_size_idcd',
								value		: shet_name2,
								hidden		: true,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								width		: 170,
								margin		: '0 1 0 0',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-shetitem-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'  },
									result	: function(records, nameField, pairField) {
										var panel1 = nameField.up('form');
										var layout = ('[name=esti_idcd]');
										panel1.down('[name=horz_leng]').setValue(records[0].get('horz_leng'));
										panel1.down('[name=vrtl_leng]').setValue(records[0].get('vrtl_leng'));
										panel1.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
										nameField.setValue(records[0].get('shet_name'));
										pairField.setValue(records[0].get('shet_idcd'));
//										var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
									},
									create : function (self ) {
										if((form.down('[name=item_lcls_idcd]')).value == '' || ((form.down('[name=item_lcls_idcd]')).value == null)){
											Ext.Msg.alert("알림","품목종류를 먼저 선택하여 주십시오.");
											popup.close();
											return;
										}
									},
								},
								listeners	: {
									change	: function(){
										var val  = this.getValue(),
										val2 = form.down('[name=horz_leng]')
										val3 = form.down('[name=vrtl_leng]')
										;
										console.log(val);
										if(val == ""){
											val2.setValue(null);
											val3.setValue(null);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('horz_leng','가로'),
								xtype		: 'numericfield'	,
								name		: 'horz_leng',
								value		: horz_leng,
								labelWidth	: 45,
								width		: 115,
								readOnly	: true,
								margin		: '0 0 0 15',
							},{	fieldLabel	: Language.get('vrtl_leng','세로'),
								xtype		: 'numericfield'	,
								name		: 'vrtl_leng',
								value		: vrtl_leng,
								labelWidth	: 25,
								width		: 100,
								readOnly	: true,
								margin		: '0 0 0 23',
							},{	fieldLabel	: Language.get('cvst_qntt','수량'),
								xtype		: 'numericfield'	,
								name		: 'cvst_qntt',
								value		: cvst_qntt,
								margin		: '0 0 0 12',
								labelWidth	: 30,
								width		: 105,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0', itemId: 'size' , hidden:true,
						items	: [
							{	fieldLabel	: Language.get('','재단사이즈'),
								xtype		: 'popupfield',
								name		: 'fdat_size_name',
								pair		: 'fdat_size_idcd',
								value		:fdat_size_name,
								hidden		: false,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								width		: 170,
								margin		: '0 1 0 0',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-shetitem-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' ,lcls_idcd:'000090' ,mcls_idcd:'000092' ,scls_idcd:'000094'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('shet_name'));
										pairField.setValue(records[0].get('shet_idcd'));
//												var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
									}
								},
							},{	name : 'fdat_size_idcd', xtype	: 'textfield', hidden : false
							},{	fieldLabel	: Language.get('','작업사이즈'),
								xtype		: 'popupfield',
								name		: 'work_size_name',
								pair		: 'work_size_idcd',
								value		: work_size_name,
								hidden		: false,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								width		: 170,
								margin		: '0 1 0 29',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-shetitem-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' ,lcls_idcd:'000090' ,mcls_idcd:'000092' ,scls_idcd:'000095'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('shet_name'));
										pairField.setValue(records[0].get('shet_idcd'));
//										var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
									}
								},
							},{	name : 'work_size_idcd', xtype	: 'textfield', hidden : false
							},{	xtype		: 'textfield',
								hidden		: true,
								name		: 'size_chk'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('esti_pric','견적단가'),
								name		: 'esti_pric',
								xtype		: 'popupfield',
								value		: 0,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 50,
								width		: 160,
								margin		: '0 0 0 10',
								popup		: {
									widget	: 'lookup-shet-popup-workshop',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' , lcls_idcd : '000048' , mcls_idcd : '000054'},
									result	: function(records, nameField, pairField ) {
										var record = records[0];
										nameField.setValue(record.get('esti_pric'));
									},
									create : function (self ) {
										if((form.down('[name=shet_size_idcd]')).value == '' || ((form.down('[name=shet_size_idcd]')).value == null)){
											Ext.Msg.alert("알림","사이즈를 먼저 선택하여 주십시오.");
											popup.close();
											return;
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'work_memo',
								xtype		: 'textarea',
								value		: work_memo,
								labelWidth	: 60,
								height		: 85,
								width		: 370,
							}
						]
					}
				],
				buttons: [
					{	text : Const.FINISH.text,
						iconCls: Const.FINISH.icon,
						cls: 'button-style',
						handler: function(rec) {
							var me2 = this;
							var param = Ext.merge(this.up('form').getValues());
							if(param.item_lcls_idcd == '' || param.item_lcls_idcd == null){
								Ext.Msg.alert("알림","품목종류을 선택하여 주십시오.");
								return;
							}
							item_lcls_idcd	= param.item_lcls_idcd;
							ttle			= param.ttle;
							shet_name		= param.shet_idcd;
							lcls_idcd		= param.lcls_idcd;
							mcls_idcd		= param.mcls_idcd;
							scls_idcd		= param.scls_idcd;
							horz_leng		= param.horz_leng;
							vrtl_leng		= param.vrtl_leng;
							cvst_qntt		= param.cvst_qntt;
							fdat_size_idcd	= param.fdat_size_idcd;
							work_size_idcd	= param.work_size_idcd;
							shet_size_idcd	= param.shet_size_idcd;
							esti_pric		= param.esti_pric;
							work_memo	= param.work_memo;
							invc_numb		= param.invc_numb;
							line_seqn		= param.line_seqn;

							Ext.Ajax.request({
								url		: _global.location.http() + '/workshop/sale/order/estimast/set/records2.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
//										stor_id			: _global.stor_id,
////										hqof_idcd		: _global.hqof_idcd,
										item_lcls_idcd	: item_lcls_idcd,
										ttle			: ttle,
										shet_name		: shet_name,
										lcls_idcd		: lcls_idcd,
										mcls_idcd		: mcls_idcd,
										scls_idcd		: scls_idcd,
										horz_leng		: horz_leng,
										vrtl_leng		: vrtl_leng,
										cvst_qntt		: cvst_qntt,
										fdat_size_idcd	: fdat_size_idcd,
										work_size_idcd	: work_size_idcd,
										shet_size_idcd	: shet_size_idcd,
										esti_pric		: esti_pric,
										work_memo		: work_memo,
										invc_numb		: invc_numb,
										line_seqn		: line_seqn,
//										updt_idcd		: _global.login_pk,
										_set			: set
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
										console.log(tree);
//										tree.getStore().reload({
//											params:{param:JSON.stringify({invc_numb:select.get('invc_numb')}) }
//											, scope:me,
//											callback:function(records, operation, success) {
//												if (success) {
//												} else {
//												}
//											}
//										});
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){
									tree.getStore().reload({
									params:{param:JSON.stringify({invc_numb:invc_numb}) }
									, scope:me,
									callback:function(records, operation, success) {
										if (success) {
										} else {
										}
									}
								});
									/* 성공 실패 관계 없이 호출된다. */
								}
							});
							this.up('window').destroy();
						}
					},{	text : Const.CLOSER.text,
						iconCls: Const.CLOSER.icon ,
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').destroy();
						}
					}
				],

			});

			win = Ext.widget('window', {
				title: title,
				closeAction: 'hide',
				width: 440,
				height: 340,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide();
//		}
//		else{
//			Ext.Msg.alert("알림","추가/수정하려는 품목의 상위 품목은 하나만 선택할 수 있습니다.");
//		}
	},

	draw : function(rec){
		//TODO 이미지저장
		var	me = this
			tree	= Ext.ComponentQuery.query('module-estimast-tree')[0],
			records	= tree.getSelectionModel().getSelection(),
			select = tree.getSelectionModel().getSelection()[0]
		;
		if(select){
			Ext.Ajax.request({
				url		: _global.location.http() + '/workshop/sale/order/estimast/get/shet.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: rec.get("invc_numb"),
						line_seqn	: rec.get("line_seqn"),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						invc_numb = rec.get("invc_numb"),
						line_seqn = rec.get("line_seqn")
						bkbd_kind_name =result.records[0].bkbd_kind_name
						bkbd_dirt_dvcd =result.records[0].bkbd_dirt_dvcd
						shet_name_covr =result.records[0].shet_name_covr
						covr_shet_wght =result.records[0].covr_shet_wght
						dsgn_code =result.records[0].dsgn_code
						covr_dsgn_dvcd =result.records[0].covr_dsgn_dvcd
						esti_amnt_covr =result.records[0].esti_amnt_covr
						shet_name_coti =result.records[0].shet_name_coti
						fcvr_strg =result.records[0].fcvr_strg
						scvr_strg =result.records[0].scvr_strg
						bcvr_strg =result.records[0].bcvr_strg
					};
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			resource.loadPopup({
				widget : 'module-estimast-popup',
				params :	{
					invc_numb	: invc_numb,
					line_seqn	: line_seqn,
					bkbd_kind_name : bkbd_kind_name,
					bkbd_dirt_dvcd : bkbd_dirt_dvcd,
					shet_name_covr : shet_name_covr,
					covr_shet_wght : covr_shet_wght,
					dsgn_code : dsgn_code,
					covr_dsgn_dvcd : covr_dsgn_dvcd,
					esti_amnt_covr : esti_amnt_covr,
					shet_name_coti : shet_name_coti,
					fcvr_strg : fcvr_strg,
					scvr_strg : scvr_strg,
					bcvr_strg : bcvr_strg,
				}
			});
		}
	},


	shetItem:function(rec){
		var	me = this,
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-estimast-lister-shetItem')[0]

		;
		editor.selectRecord({ record : select }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:rec.get("invc_numb"),line_seqn:rec.get("line_seqn")}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(2);
		window.tabActive = 1;
	},

	mainItem:function(rec){
		var	me = this,
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor3')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-estimast-lister-mainItem')[0]

		;
		editor.selectRecord({ record : select }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:rec.get("invc_numb"),line_seqn:rec.get("line_seqn")}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(4);
		window.tabActive = 1;
	},
	subItem:function(rec){
		var	me = this,
			layout = layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor4')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-estimast-lister-subItem')[0]
		;
		editor.selectRecord({ record : select }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:rec.get("invc_numb"),line_seqn:rec.get("line_seqn")}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(3);
		window.tabActive = 1;
	}
});