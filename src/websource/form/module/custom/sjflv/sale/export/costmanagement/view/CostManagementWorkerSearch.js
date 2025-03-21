Ext.define('module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.sale.export.costmanagement.store.CostManagementInvoice',
	alias	: 'widget.module-costmanagement-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1()];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 120,
						items	: [
							{	text		: '비용구분' , xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'lookupfield',
								name		: '',
								margin		: '2 2 2 2',
								lookupValue	: resource.lookup(''),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '입금액', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: '',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '원화입금액', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: '',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 150 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '금융기관', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: '',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//												panel.down('[name=invc_qntt]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 130 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '계좌번호', xtype : 'label', itemId : 'unit_idcd', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: '',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//												panel.down('[name=invc_qntt]').focus(true, 10);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 80 ,
						items	: [
							{	text		: '수수료', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'numericfield',
								name		: '',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
//												panel.down('[name=offr_qntt]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 100 ,
						items	: [
							{	text		: '입금통보일', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'datefield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 130 ,
						items	: [
							{	text		: '비고', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							}
						]
					}
				]
			}
		;
		return line;
	},

	/**
	 * 품목 데이터를 조회한다.
	 */
	selectItem : function (config) {
		var me		= this,
			panel	= config.panel,
			length	= config.records.length
		;
		Ext.each(config.records, function(record, index) {
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},

	/**
	 * 품목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record,
			html	= config.html || ''
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
			me.down('#itemviewer').update( html );
		} else {
			var cstm = Ext.ComponentQuery.query('module-saleorder3-worker-editor')[0].down('[name=cstm_idcd]').getValue(),
				val = [],
				result1 = []
			;
			if(cstm != '' && cstm != null){
				val.push({item_idcd : record.data.item_idcd, cstm_idcd : cstm})
				Ext.Ajax.request({
					url		: _global.location.http() + '/item/itemmast/get/itemacpt.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							records			: val
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
							result1.push(result);
							//품목군~ 레코드가 있는것만 들어가게
							console.log(result1);
							if(result1[0].records.length > 0){
								me.down('[name=mtrl_bacd]').setValue('0005');
								me.down('[name=make_bacd]').setValue('0005');
								me.down('[name=item_bacd]').setValue('0005');
//								me.down('[name=item_clss_bacd]').setValue(result1[0].records[0].item_clss_bacd);

//								if(result1[0].records[0].mtrl_bacd != ''){
//									me.down('[name=mtrl_bacd_name]').setValue(result1[0].records[0].mtrl_bacd_name);
//								}
//								if(result1[0].records[0].make_bacd != ''){
//									me.down('[name=make_bacd_name]').setValue(result1[0].records[0].make_bacd_name);
//								}
//								if(result1[0].records[0].item_bacd != ''){
//									me.down('[name=item_bacd_name]').setValue(result1[0].records[0].item_bacd_name);
//								}
								if(result1[0].records[0].item_clss_bacd != ''){
									me.down('[name=item_clss_bacd_name]').setValue(result1[0].records[0].item_clss_bacd_name);
								}
//								me.down('[name=emgc_yorn]'			).setValue(result1[0].records[0].emgc_yorn);
//								me.down('[name=srfc_proc_yorn]'		).setValue(result1[0].records[0].srfc_proc_yorn);
								me.down('[name=cont_pric]'			).setValue(result1[0].records[0].cont_pric);
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'		).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'		).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'		).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'		).setValue(record.get('item_code' ));
			me.down('[name=item_name]'		).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'		).setValue(record.get('item_spec' ));
			me.down('[name=cont_pric]'		).setValue(record.get('cont_pric' ));
			me.down('[name=cstm_lott_numb]'	).setValue(record.get('cstm_lott_numb' ));
			me.down('[name=invc_qntt]'		).setValue('1');
			me.down('[name=user_memo]'		).setValue('');
//			me.down('[name=deli_date2]'		).setValue(record.get('deli_date2'));
//			me.down('[name=sply_amnt]'		).setValue(record.get('sply_amnt' ));
//			me.down('[name=vatx_amnt]'		).setValue(record.get('vatx_amnt'));
//			me.down('[name=invc_amnt]'		).setValue(record.get('invc_amnt'));


			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					 + '  <div style = "width: 100;  float : left" >'
					 + '  	<div>계정구분</div><div>'+ record.get('acct_bacd_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 300;  float : left" >'
					 + '  	<div>품목분류</div><div>'+ record.get('clss_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>모델명</div><div>'+ record.get('modl_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>입고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>출고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '</div>'
				;
				me.down('#itemviewer').update( html );
			}
		}
	},

	/**
	 * 입력된 상품을 등록한다.
	 */
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			editor		= me.ownerCt.editor,
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn	= undefined
		;

		var seq = editor.getSEQ();
		var dsp = '';
		var srfc_proc_yorn = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		if(me.down('[name=srfc_proc_yorn1]').getValue() == false ) {
			srfc_proc_yorn = '0';
		}	else if(me.down('[name=srfc_proc_yorn0]').getValue() == false){
			srfc_proc_yorn = '1';
		}

		if(me.down('[name=emgc_yorn1]').getValue() == false ) {
			emgc_yorn = '0';
		}	else if(me.down('[name=emgc_yorn0]').getValue() == false){
			emgc_yorn = '1';
		}
		console.log(me.down('[name=item_bacd]').getValue());
		console.log(me.down('[name=item_clss_bacd]').getValue());

		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = me.down('[name=prnt_idcd]').getValue();
		}
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			prnt_idcd		: uper_seqn,
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			cstm_lott_numb	: me.down('[name=cstm_lott_numb]').getValue(),
			invc_qntt		: me.down('[name=invc_qntt]').getValue(),
			cont_pric		: me.down('[name=cont_pric]').getValue(),
			sply_amnt		: me.down('[name=sply_amnt]').getValue(),
			vatx_amnt		: me.down('[name=vatx_amnt]').getValue(),
			invc_amnt		: me.down('[name=invc_amnt]').getValue(),
			deli_date2		: Ext.Date.format(me.down('[name=deli_date2]').getValue(),'Y-m-d'),
			remk_text		: me.down('[name=user_memo]').getValue(),
			mtrl_bacd		: me.down('[name=mtrl_bacd]').getValue(),
			item_clss_bacd	: me.down('[name=item_clss_bacd]').getValue(),
			item_bacd		: me.down('[name=item_bacd]').getValue(),
			make_bacd		: me.down('[name=make_bacd]').getValue(),
			srfc_proc_yorn	: srfc_proc_yorn,
			emgc_yorn		: emgc_yorn,

			mtrl_bacd_name		: me.down('[name=mtrl_bacd_name]').getValue(),
			item_clss_bacd_name	: me.down('[name=item_clss_bacd_name]').getValue(),
			item_bacd_name		: me.down('[name=item_bacd_name]').getValue(),
			make_bacd_name		: me.down('[name=make_bacd_name]').getValue(),
		});
		if(_global.hq_id.toUpperCase() == "N1000NBOLT"){
			if (!is_equal) {
				store.add(record);
			}
		} else{
			store.each(function(findrecord) {
				if (   findrecord.get('item_idcd') == record.get('item_idcd')
					&& findrecord.get('item_code') == record.get('item_code')
					&& findrecord.get('item_name') == record.get('item_name')
					&& findrecord.get('item_spec') == record.get('item_spec')
					&& findrecord.get('unit_idcd') == record.get('unit_idcd')
					&& findrecord.get('unit_name') == record.get('unit_name')
					&& findrecord.get('cstm_lott_numb') == record.get('cstm_lott_numb')
					&& findrecord.get('deli_date2') == record.get('deli_date2')) {
					is_equal = true;
					// 상품의 수량을 추가
					findrecord.set("vatx_amnt", findrecord.get('vatx_amnt') + record.get('vatx_amnt'));
					findrecord.set("invc_qntt", findrecord.get('invc_qntt') + record.get('invc_qntt'));
					findrecord.set("invc_amnt", findrecord.get('invc_amnt') + record.get('invc_amnt'));
					findrecord.set("sply_amnt", findrecord.get('sply_amnt') + record.get('sply_amnt'));
				}
			});
			// 상품을 추가
			if (!is_equal) {
				store.add(record);
				store.commitChanges();
			}
		}
		me.attachItem({ clear : true });

	},
});
