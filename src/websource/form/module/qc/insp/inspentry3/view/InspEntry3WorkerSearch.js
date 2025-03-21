Ext.define('module.qc.insp.inspentry3.view.InspEntry3WorkerSearch', { extend: 'Axt.form.Search',

	alias   : 'widget.module-inspentry3-worker-search',
	style   : 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
//		me.items = [me.createLine1(), me.createLine2() ];
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
				margin : '0 0 0 0'  ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'hbox', align: 'stretch' },
						margin	: '3 0 3 3',
						items	: [
							{	fieldLabel	: '발주번호',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'orig_invc_numb',
								clearable	: true,
								editable	: true ,
								enableKeyEvents: true ,
								width 		: 260,
								listeners	: {
									keydown : function(self, e) {
										/* 엔터키 이벤트를 호출한다. */
										if (e.keyCode == e.ENTER ) {
											/* 팝업창을 호출한다. */
//											self.onTriggerClick();
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									},
								},
								popup		: {
									widget	: 'lookup-purcordr-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
										me.copyAction( { records : records } );
									},
									create : function (self ) {
										var cstm_idcd = Ext.ComponentQuery.query('module-inspentry3-worker-editor')[0].getValues().cstm_idcd;
										Ext.merge(self.popup.params, {
											cstm_idcd : cstm_idcd
										});
									},

								}
							},{	text		: '<< 거래명세서에 표시된 발주번호를 바코드 리더기로 Reading 하세요..>>' , xtype : 'label', width : 600 , margin : '6 0 0 30'
							}
						]
					},{	name : 'prnt_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'unit_idcd'	, xtype : 'textfield'    , hidden : true
					},{	name : 'lott_numb'	, xtype : 'textfield'    , hidden : true
					},{	name : 'piece_qty'	, xtype : 'numericfield' , hidden : true
					},{	name : 'txfree_yn'	, xtype : 'textfield'    , hidden : true
					},{	name : 'stnd_pric'	, xtype : 'numericfield' , hidden : true
					}
				]
			}
		;
		return line;
	},

	createLine2 : function () {
		var me = this,
			line = {
				xtype	: 'container',
				margin	: '0 0 0 0',
				itemId	: 'itemviewer',
				layout	: 'border',
				border	: 1,
				style	: Const.borderLine.top +  Const.borderLine.bottom ,
				height	: 35,
				html	: ''
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
	copyAction:function(config) {
		var me = this
		;
		Ext.Ajax.request({
			url		: _global.api_host_info + '/system/mtrl/po/purcordr/get/lookup.do',
			params	: Ext.merge({ token : _global.token_id }, { param : JSON.stringify({ invc_numb : me.down('[name=orig_invc_numb]').getValue() })}),
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				Ext.each(result.records, function(record, index ){
					me.appendItem( { records : record , append : (result.records.length > 1)})
				})
			}
		})
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
		return;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
			me.down('#itemviewer').update( html );
//			me.down('[name=brcd]').focus(true, 10);
			me.down('[itemId=unit_name]').update('단위');
		} else {
			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'	).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'	).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'	).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'	).setValue(record.get('item_code' ));
			me.down('[name=item_name]'	).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'	).setValue(record.get('item_spec' ));
			me.down('[name=istt_qntt]'	).setValue('1');
			me.down('[name=stnd_pric]'	).setValue(record.get('stnd_pric'));
			me.down('[name=user_memo]'  ).setValue('');
			if (config.append) {
				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					 + '  <div style = "width: 100;  float : left" >'
					 + '  	<div>계정구분</div><div>'+ record.get('aset_clss_name') +'</div> '
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
			uper_seqn	= undefined,
			srecord		= config.records
		;
		console.debug('config is : ',config)
		console.debug('record is : ',srecord)
		console.debug(srecord.item_idcd);
		var seq = editor.getSEQ();
		var dsp = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
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
			istt_wrhs_idcd	: srecord.istt_wrhs_idcd,
			item_idcd		: srecord.item_idcd,
			item_code		: srecord.item_code,
			item_name		: srecord.item_name,
			item_spec		: srecord.item_spec,
			istt_pric		: srecord.offr_pric,
			istt_qntt		: srecord.not_dlvy_qntt,
			vatx_incl_yorn	: srecord.vatx_incl_yorn,
			vatx_rate		: srecord.vatx_rate,
			istt_amnt		: srecord.offr_amnt,
			istt_vatx		: srecord.offr_vatx,
			ttsm_amnt		: srecord.ttsm_amnt,
			krwn_pric		: srecord.krwn_pric,
			krwn_amnt		: srecord.krwn_amnt,
			krwn_vatx		: srecord.krwn_vatx,
			krwn_amnt_totl	: srecord.krwn_amnt_totl,
			pric_dvcd		: srecord.pric_dvcd,
//			cstm_idcd		: srecord.cstm_idcd,
			stnd_unit		: srecord.stnd_unit,
			not_dlvy_qntt	: srecord.not_dlvy_qntt,
			stnd_unit_qntt	: srecord.stnd_unit_qntt,
			lott_numb		: '',
			sral_strt_numb	: '',
			sral_endd_numb	: '',
			remk_text		: '',
			prof_data		: srecord.prof_data,
			istt_insp_yorn	: '0',
			insp_qntt		: 0,
			pass_qntt		: 0,
			poor_qntt		: 0,
			orig_invc_numb	: srecord.invc_numb,
			orig_amnd_degr	: '1',
			orig_seqn		: srecord.line_seqn
		});

//		store.each(function(findrecord) {
//			if (   findrecord.get('item_idcd') == record.get('item_idcd')
//				&& findrecord.get('item_code') == record.get('item_code')
//				&& findrecord.get('item_name') == record.get('item_name')
//				&& findrecord.get('item_spec') == record.get('item_spec')
//				&& findrecord.get('unit_name') == record.get('unit_name')) {
//				is_equal = true;
//				// 상품의 수량을 추가
//				findrecord.set("istt_qntt", findrecord.get('istt_qntt') + record.get('istt_qntt'));
//			}
//		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}

		me.attachItem({ clear : true });
	}
});
