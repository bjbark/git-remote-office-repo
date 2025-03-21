Ext.define('module.project.bonsainfo.model.BonsaInfo',{ extend:'Axt.data.Model',
    fields: [
		{	name: 'pjt_id',        	    type: 'string'
        },{ name: 'pos_ddns',          	type: 'string'
	 	},{ name: 'web_ddns',          	type: 'string'
	 	},{ name: 'img_ddns',          	type: 'string'
	 	},{ name: 'logo_url',          	type: 'string'  , persist: false
	 	},{ name: 'own_stor_id',       	type: 'string'
	    },{ name: 'hq_grp',           	type: 'string'
	    },{ name: 'hq_id',           	type: 'string'
	    },{ name: 'hq_nm',             	type: 'string'
	    },{ name: 'hq_gb',           	type: 'string'  , defaultValue : '0'
	    },{ name: 'hq_reg_dt',          type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
	    },{ name: 'corp_id',           	type: 'string'  , defaultValue : '0000'
	    },{ name: 'corp_nm',            type: 'string'  , persist: false
	    },{ name: 'stor_id',            type: 'string'
	    },{ name: '_bonsa_sts',         type: 'string'  , defaultValue : '1000' , mapping : 'hq_sts'
	    },{ name: 'hq_sts',            	type: 'string'  , defaultValue : '1000'
	    },{ name: 'row_lvl',        	type: 'string'  , defaultValue : 0
	    },{ name: 'del_yn',            	type: 'string'
	    },{ name: 'hq_ver',            	type: 'string'
	    },{ name: 'epo_db_id',          type: 'string'
	    },{ name: 'hq_nts_id',          type: 'string'
	    },{ name: 'hq_sms_id',          type: 'string'
	    },{ name: 'hq_pos_id',          type: 'string'
	    },{ name: 'hq_sms_id',         	type: 'string'
	    },{ name: 'hq_sms_cd',         	type: 'string'
	    },{ name: 'hq_fax_id',  	    type: 'string'
	    },{ name: 'hq_fax_cd',	        type: 'string'
	    },{ name: 'old_inf_yn',         type: 'string'  , defaultValue : '0'
	    },{ name: 'erp_inf_yn',         type: 'string'  , defaultValue : '0'
	    },{ name: 'web_inf_yn',         type: 'string'  , defaultValue : '0'
	    },{ name: 'itm_rcpt_yn',        type: 'string'  , defaultValue : '0'
	    },{ name: 'contr_cnts',         type: 'int'  , defaultValue : 0
	    },{ name: 'contr_1000',         type: 'int'  , defaultValue : 0
	    },{ name: 'contr_2000',         type: 'int'  , defaultValue : 0
	    },{ name: 'contr_2500',         type: 'int'  , defaultValue : 0
	    },{ name: 'contr_3000',         type: 'int'  , defaultValue : 0
	    },{ name: 'contr_etcs',         type: 'int'  , defaultValue : 0
	    },{ name: 'last_read_dt',       type: 'string', persist: false  , convert : Ext.util.Format.strToDate
	    },{ name: 'last_sale_dt',       type: 'string', persist: false  , convert : Ext.util.Format.strToDate
	    },{ name: 'pos_hostanem',       type: 'string'
	    },{ name: 'usr_memo',         	type: 'string'
	    },{ name: 'row_sts',         	type: 'string', defaultValue : 0
	    },{ name: 'reinitial',         	type: 'string', defaultValue : 0
	    },{ name: 'upt_ui',         	type: 'string', defaultValue: '0000000038'
	    },{ name: 'crt_ui',         	type: 'string', defaultValue: '0000000038'
	    },{ name: 'upt_id',          	type: 'string', defaultValue : _global.login_pk
	    },{ name: 'crt_id',          	type: 'string', defaultValue : _global.login_pk
	    },{name : 'find_nm',            type: 'string' 	, serialize : function ( value , record) { return resource.fusion( '#{hq_id}/#{hq_nm}/#{pjt_id}' , record ) }
	    }
    ]
});
