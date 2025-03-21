package com.baroservice.api.bankaccount;

import java.rmi.RemoteException;


import com.baroservice.api.BarobillApiProfile;
import com.baroservice.api.BarobillApiService;
import com.baroservice.ws.BankAccount;
import com.baroservice.ws.PagedBankAccountLog;
import com.baroservice.ws.PagedBankAccountLogEx;

/**
 * <h2>바로빌 계좌조회 API 샘플</h2>
 */
public class Tests {

    /**
     * <h2>바로빌 API 정의 클래스</h2>
     * <p>
     * 환경에 따라 BarobillApiProfile 를 지정해주세요.
     */
    private BarobillApiService barobillApiService;

    public Tests() {
        barobillApiService = new BarobillApiService(BarobillApiProfile.TESTBED);
    }

    /**
     * GetBankAccount - 등록한 계좌번호 조회
     */
    public void GetBankAccount() throws RemoteException {
        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)

        BankAccount[] result = barobillApiService.bankAccount.getBankAccount(certKey, corpNum);

        System.out.println(result);
    }

    /**
     * GetDailyBankAccountLog - 일별 계좌 입출금내역 조회
     */
    public void GetDailyBankAccountLog() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String bankAccountNum = "";     // 계좌번호
        String baseDate = "";           // 기준날짜
        int countPerPage = 10;          // 페이지수
        int currentPage = 1;            // 현재페이지
        int orderDirection = 2;         // 1:ASC 2:DESC

        PagedBankAccountLog result = barobillApiService.bankAccount.getDailyBankAccountLog(certKey, corpNum, id, bankAccountNum, baseDate, countPerPage, currentPage, orderDirection);

        System.out.println(result);
    }

    /**
     * GetDailyBankAccountLogEx - 일별 계좌 입출금내역 조회 (고유키 추가)
     */
    public void GetDailyBankAccountLogEx() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String bankAccountNum = "";     // 계좌번호
        String baseDate = "";           // 기준날짜
        int countPerPage = 10;          // 페이지수
        int currentPage = 1;            // 현재페이지
        int orderDirection = 2;         // 1:ASC 2:DESC

        PagedBankAccountLogEx result = barobillApiService.bankAccount.getDailyBankAccountLogEx(certKey, corpNum, id, bankAccountNum, baseDate, countPerPage, currentPage, orderDirection);

        System.out.println(result);

    }

    /**
     * GetMonthlyBankAccountLog - 월별 계좌 입출금내역 조회
     */
    public void GetMonthlyBankAccountLog() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String bankAccountNum = "";     // 계좌번호
        String baseMonth = "";          // 기준월
        int countPerPage = 10;          // 페이지수
        int currentPage = 1;            // 현재페이지
        int orderDirection = 2;         // 1:ASC 2:DESC

        PagedBankAccountLog result = barobillApiService.bankAccount.getMonthlyBankAccountLog(certKey, corpNum, id, bankAccountNum, baseMonth, countPerPage, currentPage, orderDirection);

        System.out.println(result);
    }

    /**
     * GetMonthlyBankAccountLogEx - 월별 계좌 입출금내역 조회 (고유키 추가)
     */
    public void GetMonthlyBankAccountLogEx() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String bankAccountNum = "";     // 계좌번호
        String baseMonth = "";          // 기준월
        int countPerPage = 10;          // 페이지수
        int currentPage = 1;            // 현재페이지
        int orderDirection = 2;         // 1:ASC 2:DESC

        PagedBankAccountLogEx result = barobillApiService.bankAccount.getMonthlyBankAccountLogEx(certKey, corpNum, id, bankAccountNum, baseMonth, countPerPage, currentPage, orderDirection);

        System.out.println(result);
    }

    /**
     * GetBankAccountScrapRequestURL - 계좌조회 서비스 신청 URL
     */

    public void GetBankAccountScrapRequestURL() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String pwd = "";                // 바로빌 회원 비밀번호

        String result = barobillApiService.bankAccount.getBankAccountScrapRequestURL(certKey, corpNum, id, pwd);

        System.out.println(result);
    }

    /**
     * GetBankAccountManagementURL - 계좌번호 관리 URL
     */

    public void GetBankAccountManagementURL() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String pwd = "";                // 바로빌 회원 비밀번호

        String result = barobillApiService.bankAccount.getBankAccountManagementURL(certKey, corpNum, id, pwd);

        System.out.println(result);
    }

    /**
     * GetBankAccountLogURL - 계좌 사용내역 url
     */

    public void GetBankAccountLogURL() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                 // 바로빌 회원 아이디
        String pwd = "";                // 바로빌 회원 비밀번호

        String result = barobillApiService.bankAccount.getBankAccountLogURL(certKey, corpNum, id, pwd);

        System.out.println(result);
    }

}
