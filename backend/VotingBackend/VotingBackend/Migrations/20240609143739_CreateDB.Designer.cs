﻿// <auto-generated />
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using VotingBackend.Models;

#nullable disable

namespace VotingBackend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240609143739_CreateDB")]
    partial class CreateDB
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("VotingBackend.Models.Vote", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("addressVoter")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("address_voter");

                    b.Property<List<string>>("listVote")
                        .IsRequired()
                        .HasColumnType("text[]")
                        .HasColumnName("list_vote");

                    b.Property<string>("votingIdid")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.HasIndex("votingIdid");

                    b.ToTable("Vote");
                });

            modelBuilder.Entity("VotingBackend.Models.Voting", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("maxVotes")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("max_votes");

                    b.Property<string>("totalCandidates")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("total_candidates");

                    b.Property<string>("totalVotings")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("total_votings");

                    b.Property<string>("votingName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("voting_name");

                    b.HasKey("id");

                    b.ToTable("voting");
                });

            modelBuilder.Entity("VotingBackend.Models.Vote", b =>
                {
                    b.HasOne("VotingBackend.Models.Voting", "votingId")
                        .WithMany("Votes")
                        .HasForeignKey("votingIdid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("votingId");
                });

            modelBuilder.Entity("VotingBackend.Models.Voting", b =>
                {
                    b.Navigation("Votes");
                });
#pragma warning restore 612, 618
        }
    }
}