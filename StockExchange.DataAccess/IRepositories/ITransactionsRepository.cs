﻿using StockExchange.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StockExchange.DataAccess.IRepositories
{
    public interface ITransactionsRepository
    {
        Task<IList<UserTransaction>> GetAllUserTransactions(int userId);
        Task<Dictionary<int, List<UserTransaction>>> GetTransactionsByCompany(int userId);
        Task<int> GetTransactionsCount(int userId);
    }
}